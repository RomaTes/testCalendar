import React from 'react';
//styles
import '../components/calendar.scss';

//modules
import * as hovers from '../utils/dragAndDrop.ts';
import * as  calendar from '../utils/calendarData.ts';

//components
import Form from './forms/taskForm.tsx';
import Search from './primitives/search.tsx';

function CalendarComp() {

    const [dataHollidays, setData] = React.useState(null);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [Days, setDataDays] = React.useState(null);
    const [startDay, setStartDay] = React.useState(null);
    const [activeMonth, setActiveMonth] = React.useState(null);
    const [choosenDay, setChoosenDay] = React.useState(null);
    const [choosenTaskWrap, setchoosenTaskWrap] = React.useState(null);
    const [choosenTasksParent, choosenTasksParentWrap] = React.useState(null);

    const [isFormOpen, changeFormState] = React.useState(false);
    const [draggedTask, setDraggedTask] = React.useState(null);

    const [activeYear, setActiveYear] = React.useState(2023);

    const [choosenColor, setChoosenColor] = React.useState('rgb(128, 0, 0)');
    const [taskTekst, setTaskTekst] = React.useState('');

    const [hoolidaysForThisMonth, setHollidaysthisMonth] = React.useState([]);

    const [taskList, setTasks] = React.useState([]);

    const changeMonth = React.useCallback((value) => {

      const month = value < 0 ? 11 : value > 11 ? 0 : value;
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      createCalendar(month, currentYear);
     
      const allTasks = document.querySelectorAll(".task-cell");

      for(let i = 0; i < allTasks.length; i++) allTasks[i]?.remove();   
        
      const taskForThisMonth = taskList.filter(v => v.year === currentYear).filter(v => v.month === month);
      taskForThisMonth.sort((a, b) => a.position - b.position);
      for(let i = 0; i < taskForThisMonth.length; i++){
        const wrapp = document.querySelectorAll('.tasks')[taskForThisMonth [i].day - 1];
        const newDiv = document.createElement('div');
        newDiv.classList.add('task-cell');
        newDiv.setAttribute("draggable","true");
        newDiv.innerHTML = taskForThisMonth[i].inputValue;
        newDiv.textContent = taskForThisMonth[i].inputValue;
        newDiv.style.background = taskForThisMonth[i].colorValue;
        newDiv.classList.add(taskForThisMonth[i].id);

        wrapp.addEventListener("dragstart",    function(e) {
          handleDragStart(e, e.target)
        });

        wrapp.appendChild(newDiv);
      }
      
      
    }, [taskList]);

    React.useEffect(() => {}, [taskList]);

    React.useEffect(() => {
      fetch("https://date.nager.at/api/v3/publicholidays/2023/UA")
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
        .catch(error => console.error(error));
        const currentDate = new Date();

        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        createCalendar(currentMonth, currentYear);
    }, []);

    React.useEffect(() => {
      setHollidays();
    }, [Days,dataHollidays]);


    const setHollidays = () => {
      const hollidaysThisMonth = [];
      if(Days && dataHollidays) {
        for(let i = 0; i < Days.length; i++) {
            const dateHolliday = `${activeYear }-${activeMonth.length === 2 ? (activeMonth + 1)  : ('0' + (activeMonth + 1))}-${String(Days[i]).length === 2 ? (Days[i])  : ('0' + (Days[i]))}`;
            const holliday = dataHollidays.find(v => v.date === dateHolliday);

            if(holliday) hollidaysThisMonth.push(holliday);
        }
      }
      setHollidaysthisMonth(hollidaysThisMonth);
    };

    const handleDragStart = (e, task) => {
      setDraggedTask(task);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.target.parentNode);
    };
  
    const handleDrop = (e, day) => {
      const classList = draggedTask.classList;
      const lastClass = classList.item(classList.length - 1);

      const changedElement = taskList.find(v => v.id === lastClass);
      const indexOfChangedelement = taskList.indexOf(changedElement);
      const taskListClone = [...taskList];
      taskListClone[indexOfChangedelement].day = day;

      e.preventDefault();
      if (draggedTask) {
        const parent = e.target.closest('.day');
        parent.querySelector('.tasks').appendChild(draggedTask);
        parent.classList.remove('drag-over');

        const elemList = parent.querySelectorAll('.task-cell');

        for(let i = 0;i < elemList.length;i++) {
          const lastClassElem = elemList[i].classList.item(elemList[i].classList.length - 1);
          const changedElementFromList = taskList.find(v => v.id === lastClassElem);
          const indexOfChangedelementFromList = taskList.indexOf(changedElementFromList);
          taskListClone[indexOfChangedelementFromList].position = i + 1;
        }
      }
      setTasks(taskListClone);
    };

    function createCalendar(month, year) {
      const calendarDays = calendar.createCalendar(month, year);
      setActiveMonth(month);
      setDataDays(calendarDays.allDaysInMonth);
      setStartDay(calendarDays.emptyDays);
    }

    const handleData = (childData) => {
      const id = Date.now();
      if(childData.inputValue) {
        if(choosenTasksParent){
        choosenTaskWrap.addEventListener("dragstart",    function(e) {
          handleDragStart(e, e.target);
        }
        );
       

        choosenTaskWrap.textContent = childData.inputValue;
        choosenTaskWrap.style.background = childData.colorValue;
        choosenTaskWrap.classList.add(String(id));
        const positionList = choosenTasksParent.querySelectorAll('.task-cell');
        let position = 1;
        if(positionList.length > 0) {
          position = positionList.length + 1;
        }
        choosenTasksParent.appendChild(choosenTaskWrap);
        
        const listClone = [...taskList];

        const elem = Object.assign(childData,{ id: String(id), month: activeMonth, year: activeYear, title: childData.inputValue, day: choosenDay, position: position });
        listClone.push(elem);

        setTasks(listClone);
      } else {
        choosenTaskWrap.textContent = childData.inputValue;
        choosenTaskWrap.style.background = childData.colorValue;
        const lastClass = choosenTaskWrap.classList.item(choosenTaskWrap.classList.length - 1);
        const listClone = [...taskList];
        const elem = listClone.find(v  => v.id === lastClass); 
        const indexOf = listClone.indexOf(elem);
        listClone[indexOf].inputValue = childData.inputValue;
        listClone[indexOf].colorValue = childData.colorValue;

        setTasks(listClone);
      }
      }
      changeFormState(false);
    };

    const current = React.useCallback((value,e) => {

      const newDiv = document.createElement('div');
      setChoosenDay(value);
      newDiv.classList.add('task-cell');
      newDiv.setAttribute("draggable","true");
      setchoosenTaskWrap(newDiv);

      if(e.classList.contains('tasks'))
      choosenTasksParentWrap(e);
      else if(e.classList.contains('task-cell')) {
        setTaskTekst(e.innerHTML);
        choosenTasksParentWrap(null);
        setChoosenColor(e.style.background);
        setchoosenTaskWrap(e);
      }
      else choosenTasksParentWrap(e.querySelector('.tasks'));

      if(isFormOpen) changeFormState(false);
      else changeFormState(true);
    }, [isFormOpen]);

    const searchElement = (month) => { 
      changeMonth(month);
    };

  return (
    <div>
        <div className="calendar">
            <div className="header">
                <div className="left">
                  <h1>{activeYear} {months[activeMonth]}</h1>
                  <button  onClick={() => changeMonth(activeMonth - 1)}>Previous Month</button>
                  <button onClick={() => changeMonth(activeMonth + 1)}>Next Month</button>
                </div>
            </div>
            <div className="days">
            {
              daysOfWeek.map(item => (
              <div key={`${item}`} className={`menu-elem ${item}`}>
                  
                  {item}
              </div>
            ))}
            </div>
            <div className="weeks">
            {
              startDay?.map(item => (
              <div key={`${item}`} className={`menu-elem ${item}`}
                
              >
              </div>
            ))
            }
            {
              Days?.map((item,i) => (
              <div key={`${item}`} className={` day menu-elem ${item}`} 
              onClick={(e) => current(item,e.target)}
              >
                  {hoolidaysForThisMonth?.find(v => v.date === `${activeYear }-${activeMonth.length === 2 ? (activeMonth + 1)  : ('0' + (activeMonth + 1))}-${String(item).length === 2 ? (Days[i])  : ('0' + (item))}`) ?
                  <div className='holliday'>
                    {hoolidaysForThisMonth?.find(v => v.date === `${activeYear }-${activeMonth.length === 2 ? (activeMonth + 1)  : ('0' + (activeMonth + 1))}-${String(item).length === 2 ? (Days[i])  : ('0' + (item))}`).localName}
                  </div> : null}
                  {item}
                  <div className="tasks" onDragOver={hovers.handleDragOver} onDrop={(e) => handleDrop(e, i+1)} onDragEnter={hovers.handleDragEnter} onDragLeave={hovers.handleDragLeave}></div>
              </div>
              ))
            }
            </div>
        </div>
        {isFormOpen ?
        <Form  onData={handleData} taskArray={taskList} inputValueProps={taskTekst} choosenColor={choosenColor}></Form> : null}

        <Search onChoose={searchElement} taskList={taskList}></Search>
    </div>
  );
}
export default CalendarComp;
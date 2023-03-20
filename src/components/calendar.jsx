import React from 'react';
//styles
import '../components/calendar.scss';

import * as hovers from '../utils/dragAndDrop.ts';
import * as  calendar from '../utils/calendarData.ts';
import * as types from '../contract.ts';

//components
import Form from './forms/taskForm';

function CalendarComp() {

    const [data, setData] = React.useState(null);
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
    
   // const [count, setCount] = React.useState<number>(1);



    const [taskList, setTasks] = React.useState([]);
    const [TaskForThisMonth, setTasksForThisMonth] = React.useState([]);

    const changeMonth = React.useCallback((value) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      console.log("Roma333",currentYear,taskList);
      console.log('test',taskList.filter(v => v.year === currentYear).filter(v => v.month === value));
      setTasksForThisMonth(taskList.filter(v => v.year === currentYear).filter(v => v.month === value));
      createCalendar(value, currentYear);
     
      console.log("PIDR",document.querySelectorAll(".task-cell"),document.querySelector(".task-cell"));
      const allTasks = document.querySelectorAll(".task-cell");
      console.log("ALL",allTasks);
      if(allTasks.length > 0){
        for(let i = 0; i < allTasks.length; i++){
          // setTimeout(() => {            
            console.log("III",allTasks[i],i);
            allTasks[i]?.remove();
          // });
     
        }
      }
      const taskForThisMonth = taskList.filter(v => v.year === currentYear).filter(v => v.month === value);
      console.log("BEMBI",taskForThisMonth);
      if(taskForThisMonth.length > 0) {
        for(let i = 0; i < taskForThisMonth.length; i++){
           // handleData(bembi[i]);
           console.log("ROMA",taskForThisMonth[i],document.querySelectorAll('.tasks'));
           const wrapp = document.querySelectorAll('.tasks')[taskForThisMonth [i].day - 1];
           const newDiv = document.createElement('div');
           newDiv.classList.add('task-cell');
           newDiv.setAttribute("draggable","true");
           newDiv.innerHTML = taskForThisMonth[i].inputValue;
           newDiv.textContent = taskForThisMonth[i].inputValue;
           newDiv.style.background = taskForThisMonth[i].colorValue;
           newDiv.classList.add(taskForThisMonth[i].id);
           wrapp.addEventListener("dragstart",    function(e) {
            // Тут ви можете написати код, який буде виконуватися при кліку на кнопку
            handleDragStart(e, e.target)
            console.log("Кнопку було натиснуто!");
            });
           wrapp.appendChild(newDiv);
        }
      }
      
      
    }, [taskList]);

    React.useEffect(() => {
      console.log("USE EFFECT");
      fetch("https://date.nager.at/api/v3/publicholidays/2023/UA")
        .then(response => response.json())
        .then(data => {
            setData(data);
            console.log(data);
        })
        .catch(error => console.error(error));
        const currentDate = new Date();
        console.log(currentDate);
        // Define the current month and year
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        createCalendar(currentMonth, currentYear);
    }, []);



    const handleDragStart = (e, task) => {
      console.log(e,task,"NNNN");
      setDraggedTask(task);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.target.parentNode);
    };
  
    const handleDragEnd = (e, task) => {
      // console.log("MAMBA",e,task,draggedTask,Task);
      const parentElement = task.parentNode;
      const grandParentElement = parentElement.parentNode;
      const classList = grandParentElement.classList;
      const lastClass = classList.item(classList.length - 1);
      console.log("MAMBA2",draggedTask,grandParentElement,lastClass);
      //setDraggedTask(null);
      //handleDragEnds();
    };
  
    // const handleDragOver = (e) => {
    //   e.preventDefault();
    //   e.dataTransfer.dropEffect = 'move';
    // };
  
    // const handleDragEnter = (e) => {
    //   console.log("A");
    //   e.preventDefault();
    //   e.currentTarget.classList.add('drag-over');
    // };
  
    // const handleDragLeave = (e) => {
    //   e.preventDefault();
    //   e.currentTarget.classList.remove('drag-over');
    // };
  
    const handleDrop = (e, day) => {
      console.log("EEE",draggedTask,taskList,e,day);
      const classList = draggedTask.classList;
      const lastClass = classList.item(classList.length - 1);
      const previousNumber = Number(lastClass);
      console.log("EEE2",previousNumber,taskList.find(v => v.id === lastClass));
      const changedElement = taskList.find(v => v.id === lastClass);
      const indexOfChangedelement = taskList.indexOf(changedElement);
      const taskListClone = [...taskList];
      taskListClone[indexOfChangedelement].day = day;
      setTasks(taskListClone);

      e.preventDefault();
      if (draggedTask) {
        const parent = e.target.closest('.day');
        parent.querySelector('.tasks').appendChild(draggedTask);
        parent.classList.remove('drag-over');
      }
    };

    function createCalendar(month, year) {
      // Define the first day of the month
      //console.log('0',month)
      // const firstDayOfMonth = new Date(year, month, 1);
      // // Define the number of days in the month
      // const numDaysInMonth = new Date(year, month + 1, 0).getDate();
      // const startingDayOfWeek = firstDayOfMonth.getDay();
      // const N = numDaysInMonth;
      // const arr = Array.from({length: N}, (_, index) => index + 1);
      
      // console.log("AAA",arr);
      const calendarDays = calendar.createCalendar(month, year);
      // console.log("TEEEEST",calendarDays);
      setActiveMonth(month);
      setDataDays(calendarDays.allDaysInMonth);
      //console.log("AAAAAAA",Days);
      //setStartDay(Array.from({length: startingDayOfWeek-1}, (_, i) => i + 1));
      setStartDay(calendarDays.emptyDays);
      //console.log("WAR", Array.from({length: startingDayOfWeek-1}, (_, i) => i + 1));

    }

    const handleData = (childData) => {
      //setData(childData);
      //console.log("CHILD",childData);
      const id = Date.now();
      if(childData.inputValue){
        choosenTaskWrap.addEventListener("dragstart",    function(e) {
          // Тут ви можете написати код, який буде виконуватися при кліку на кнопку
          handleDragStart(e, e.target);
        }
        );
       

        choosenTaskWrap.textContent = childData.inputValue;
        choosenTaskWrap.style.background = childData.colorValue;
        console.log("ALL DATA",choosenTasksParent,choosenTaskWrap);
        choosenTaskWrap.classList.add(choosenDay);
        choosenTaskWrap.classList.add(String(id));
        choosenTasksParent.appendChild(choosenTaskWrap);
        
        
      }
      //console.log("TASK111",Task);
      const a = [...taskList];
     //console.log("a",a);
      const b = Object.assign(childData,{ id: String(id), month: activeMonth, year: activeYear, title: childData.inputValue, day: choosenDay });
      a.push(b);
      console.log("C",a);
      setTasks(a);
     
      changeFormState(false);
    };

    const current = React.useCallback((value,e) => {
      console.log("IIIIIIIII",value, e); 
      const  a = e.querySelector('.tasks');



      const newDiv = document.createElement('div');
      setChoosenDay(value);
      newDiv.classList.add('task-cell');
      newDiv.setAttribute("draggable","true");
      setchoosenTaskWrap(newDiv);

      
      choosenTasksParentWrap(e);

      if(isFormOpen) changeFormState(false);
      else changeFormState(true);
    }, [isFormOpen]);


  return (
    <div>
        <div className="calendar1">
            <div className="header">
                <div className="left">
                <h1>Month Name {months[activeMonth]}</h1>
                <button  onClick={() => changeMonth(activeMonth - 1)}>Previous Month</button>
                <button onClick={() => changeMonth(activeMonth + 1)}>Next Month</button>
                </div>
                <div className="right">
                <button>Create Event</button>
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
                  {item}
                  <div className="tasks" onDragOver={hovers.handleDragOver} onDrop={(e) => handleDrop(e, i+1)} onDragEnter={hovers.handleDragEnter} onDragLeave={hovers.handleDragLeave}></div>
              </div>
              ))
            }
            </div>
        </div>
        {isFormOpen ?
        <Form  onData={handleData} taskArray={taskList}></Form> : null}
    </div>
  );
}
export default CalendarComp;
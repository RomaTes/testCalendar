export function handleDragStart (e, task) {
    console.log(e,task,"NNNN");
    //setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
  };

  export function  handleDragEnter(e)  {
    console.log("A");
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  export function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  };

  export function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
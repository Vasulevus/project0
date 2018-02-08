
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const strTasks = document.querySelector('.str-tasks');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //strike out single task
    taskList.addEventListener('click', strikeOut);
    //strike out every task
    strTasks.addEventListener('click', strikeOutAll);
}



// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
        //creating shapes of every task
        tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    //if empty task, ask to add task
    if(taskInput.value === '') {
        alert('Add a task');
        return;
    }
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Store in LS
    storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
          // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}
//strike out single todo
  function strikeOut(e){
    let decoration = e.target.style;
    decoration.textDecoration == "none" ?  decoration.textDecoration = "line-through" :  decoration.textDecoration = "none";
    }




// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    //Delete from LS
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


 //strike out all tasks
 function strikeOutAll(){
    if(taskList.firstChild.style.textDecoration !== "line-through"){
        for(var i = 0; i <taskList.childNodes.length;i++){
            taskList.childNodes[i].style.textDecoration = "line-through";
        }
    } else {
        for(var i = 0; i <taskList.childNodes.length;i++){
            taskList.childNodes[i].style.textDecoration = "none";
      }
    }
};




// Clear Tasks
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}



const todoInput = document.getElementById('todo-input');
const addTaskBtn = document.querySelector('.addTask-btn');
const taskList = document.querySelector('.tasks-list');
const imgEmptyList = document.querySelector('.empty-list-img');
const editBtn = document.querySelector('.edit-btn');
const progressBar = document.querySelector('.progress');
const progressNumbs = document.querySelector('.numbers');
const congraMsg = document.querySelector('.congra-msg');


function addTasks(){
  const tasktext =todoInput.value.trim();
  if(!tasktext){
    return;
  }
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="checkbox"/>
    <span>${tasktext}</span>
    <div class="buttons-container">
      <button class="edit-btn">
        <img src="./images/editIcon.png" alt="">
      </button>
      <button class="delete-btn">
        <img src="./images/deleteIcon.png" alt="">
      </button>
    </div>
  `;

  const deleteBtn = li.querySelector('.delete-btn'); 
  const editBtn = li.querySelector('.edit-btn');
  const checkbox = li.querySelector('.checkbox');
  const span = li.querySelector('span');



  /*window.Mycheck = (completed = false)=>{
    checkbox.addEventListener('change',()=>{
    //const isChecked = checkbox.checked;
    const isChecked = completed;
    span.classList.toggle("completed",isChecked);
    editBtn.style.opacity = span.classList.contains("completed") ? '0.5' : '1';
    editBtn.disabled = isChecked;
    editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
    ProgressStatus();
    saveTasks();
    })
  };*/

  checkbox.addEventListener('change',()=>{
    const isChecked = checkbox.checked;
    //const isChecked = completed;
    span.classList.toggle("completed",isChecked);
    editBtn.style.opacity = span.classList.contains("completed") ? '0.5' : '1';
    editBtn.disabled = isChecked;
    editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
    ProgressStatus();
    //saveTasks();
  });
  

  editBtn.addEventListener('click',()=>{
    todoInput.value = span.textContent;
    li.remove();
    ToggleEmptyImg();
    ProgressStatus();
    //saveTasks();
  });

  deleteBtn.addEventListener('click',()=>{
    li.remove();
    ToggleEmptyImg();
    ProgressStatus()
    //saveTasks();
  });

  taskList.appendChild(li);
  todoInput.value = '';
  ToggleEmptyImg();
  ProgressStatus()
  //saveTasks();
  //Mycheck();
  //console.log(taskList.children);
};



addTaskBtn.addEventListener('click',()=>{
  addTasks();
});
todoInput.addEventListener('keypress',(e)=>{
  if(e.key === 'Enter'){
    addTasks();
  }
});

function ToggleEmptyImg(){
  imgEmptyList.style.display = taskList.children.length === 0 ? 'block' : 'none';
};

function ProgressStatus(){
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
  progressBar.style.width = totalTasks ? `${completedTasks / totalTasks * 100}%` : `0%`;
  progressNumbs.textContent = `${completedTasks}/${totalTasks}`;

  if(totalTasks > 0 && (completedTasks === totalTasks)){
    congraMsg.style.display = 'block';
  }else{
    congraMsg.style.display = 'none';
  }

  console.log(progressBar.style.width);
}


/*
function saveTasks(){
  const tasksArr = Array.from(taskList.querySelectorAll('li')).map(li =>({
    text: li.querySelector('span').textContent,
    completed : li.querySelector('.checkbox').checked
  }));
  tasksArr.forEach((li,index)=>{
    console.log(li.text);
    console.log(li.completed);
    console.log(index);
  });
  localStorage.setItem('tasksArr',JSON.stringify(tasksArr));
};

function LoadTasksData(){
  const savedData = JSON.parse(localStorage.getItem('tasksArr')) || [];
  savedData.forEach((elem) => {
    addTasks(elem.text);
    Mycheck(elem.completed);
  });
};

LoadTasksData();
*/

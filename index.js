document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('task-list').addEventListener('click', manageTasks);
document.getElementById('all').addEventListener('click', () => filterTasks('all'));
document.getElementById('completed').addEventListener('click', () => filterTasks('completed'));
document.getElementById('incomplete').addEventListener('click', () => filterTasks('incomplete'));

function addTask(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input').value;
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput));
    
    const completeBtn = document.createElement('button');
    completeBtn.appendChild(document.createTextNode('Complete'));
    li.appendChild(completeBtn);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);
    
    taskList.appendChild(li);
    
    saveTask(taskInput);
    document.getElementById('task-input').value = '';
}

function manageTasks(e) {
    if (e.target.textContent === 'Complete') {
        e.target.parentElement.classList.toggle('completed');
        updateTaskStatus(e.target.parentElement.firstChild.textContent);
    } else if (e.target.textContent === 'Delete') {
        deleteTask(e.target.parentElement.firstChild.textContent);
        e.target.parentElement.remove();
    }
}

function filterTasks(status) {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(task => {
        switch (status) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'incomplete':
                task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                break;
        }
    });
}

function saveTask(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push({ task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(taskObj => {
        const taskList = document.getElementById('task-list');
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(taskObj.task));
        
        const completeBtn = document.createElement('button');
        completeBtn.appendChild(document.createTextNode('Complete'));
        li.appendChild(completeBtn);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteBtn);
        
        if (taskObj.completed) {
            li.classList.add('completed');
        }
        
        taskList.appendChild(li);
    });
}

function updateTaskStatus(taskText) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.map(taskObj => {
        if (taskObj.task === taskText) {
            taskObj.completed = !taskObj.completed;
        }
        return taskObj;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskText) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.filter(taskObj => taskObj.task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

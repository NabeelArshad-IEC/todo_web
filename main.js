document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const clearAllButton = document.getElementById('clearAll');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task before adding.'); // Display a warning message
            return;
        }

        const task = {
            text: taskText,
            completed: false,
        };

        tasks.push(task);
        saveTasks();
        taskInput.value = '';
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span id="tasktext" class="task ${task.completed ? 'completed' : ''}">${i + 1}. ${task.text}</span>
                <button class="edit"><i class="fa fa-edit"></i>Edit</button>
                <button class="delete"><i class="fa fa-trash-alt"></i>Delete</button>
            `;

            const editButton = listItem.querySelector('.edit');
            editButton.addEventListener('click', () => {
                const newText = prompt('Edit task:', task.text);
                if (newText !== null) {
                    task.text = newText.trim();
                    saveTasks();
                    renderTasks();
                }
            });

            const deleteButton = listItem.querySelector('.delete');
            deleteButton.addEventListener('click', () => {
                const confirmed = confirm('Are you sure you want to delete this task?');
                if (confirmed) {
                    tasks.splice(i, 1);
                    saveTasks();
                    renderTasks();
                }
            });

            listItem.querySelector('.task').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            taskList.appendChild(listItem);
        }
    }

    function clearAllTasks() {
        const confirmed = confirm('Are you sure you want to clear all tasks?');
        if (confirmed) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    }

    addTaskButton.addEventListener('click', addTask);
    clearAllButton.addEventListener('click', clearAllTasks);

    renderTasks();
});
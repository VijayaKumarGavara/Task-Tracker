let tasks = []; // Array to hold tasks

document.addEventListener('DOMContentLoaded', () => {
    displayMessage();
});

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });

    displayMessage(); // Update the message based on tasks
}

function displayMessage() {
    const messageArea = document.getElementById('messageArea');
    if (tasks.length === 0) {
        messageArea.innerHTML = "No tasks added. Please add a task.";
    } else {
        messageArea.innerHTML = "You have " + tasks.length + " task(s). Please complete them.";
    }
}

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;

    // Validate input
    if (!taskTitle || !taskDescription) {
        alert('Please enter both title and description.');
        return;
    }

    // Generate a unique ID for the task
    const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    // Create a new task object
    const newTask = {
        id: taskId,
        title: taskTitle,
        description: taskDescription,
        completed: false
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Display updated task list
    displayTasks();

    // Clear the form
    document.getElementById('taskForm').reset();
}

function deleteTask(taskId) {
    // Filter out the task with the specified ID
    tasks = tasks.filter(task => task.id !== taskId);

    // Display updated task list
    displayTasks();
}

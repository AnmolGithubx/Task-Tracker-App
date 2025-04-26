const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

let tasks = [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const taskDescription = document.createElement('span');
        taskDescription.textContent = task.description;

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Unmark' : 'Complete';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', () => toggleTaskCompletion(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteTask(index));

        taskItem.appendChild(taskDescription);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

// Function to add a new task
addTaskButton.addEventListener('click', () => {
    const taskDescription = taskInput.value.trim();
    if (taskDescription !== '') {
        tasks.push({ description: taskDescription, completed: false });
        taskInput.value = ''; // Clear input field
        renderTasks(); // Re-render tasks
    }
});

// Function to toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks(); // Re-render tasks
}

// Function to delete a task
function deleteTask(index) {
    const taskItem = taskList.children[index];
    taskItem.classList.add('deleted'); // Trigger fade-out animation
    setTimeout(() => {
        tasks.splice(index, 1);
        renderTasks(); // Re-render tasks after animation
    }, 500); // Wait for animation to finish before removing the task
}

// Initial render
renderTasks();

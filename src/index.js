document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("create-task-form");
    const taskList = document.getElementById("tasks");
    const sortButton = document.getElementById("sort-tasks");
    let tasks = [];
  
    taskForm.addEventListener("submit", handleFormSubmit);
    sortButton.addEventListener("click", sortTasks);
  
    function handleFormSubmit(event) {
        event.preventDefault();
  
        const description = document.getElementById("new-task-description").value.trim();
        const priority = document.getElementById("priority").value;
        const user = document.getElementById("user").value;
        const dueDate = document.getElementById("due-date").value;
  
        if (description === "") return;
  
        const task = { description, priority, user, dueDate };
        tasks.push(task);
        renderTasks();
        taskForm.reset();
    }
  
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${task.description}</strong> - ${task.user} (Due: ${task.dueDate})`;
            li.style.color = getPriorityColor(task.priority);
  
            const editBtn = createButton("Edit", () => editTask(index));
            const deleteBtn = createButton("Delete", () => deleteTask(index));
  
            li.append(editBtn, deleteBtn);
            taskList.appendChild(li);
        });
    }
  
    function editTask(index) {
        const task = tasks[index];
        document.getElementById("new-task-description").value = task.description;
        document.getElementById("priority").value = task.priority;
        document.getElementById("user").value = task.user;
        document.getElementById("due-date").value = task.dueDate;
  
        deleteTask(index);
    }
  
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }
  
    function sortTasks() {
        const priorityOrder = { "high": 1, "medium": 2, "low": 3 };
        tasks.sort((a, b) => priorityOrder[a.priority.toLowerCase()] - priorityOrder[b.priority.toLowerCase()]);
        renderTasks();
    }
  
    function getPriorityColor(priority) {
        const colors = { "high": "red", "medium": "yellow", "low": "green" };
        return colors[priority.toLowerCase()] || "black";
    }
  
    function createButton(text, callback) {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", callback);
        return button;
    }
  });
  
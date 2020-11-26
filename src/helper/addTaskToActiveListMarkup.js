const addTaskToActiveList = (task) => {
  let activeTaskListContainer = document.getElementById("activeTask");
  if (activeTaskListContainer.hasChildNodes()) {
    activeTaskListContainer.querySelectorAll("*").forEach((node) => node.remove());
  }
  let taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  let taskTitle = document.createElement("h1");
  taskTitle.innerHTML = task.todoTitle;
  taskItem.appendChild(taskTitle);
  if (task.todoContent.length) {
    let taskContent = document.createElement("h3");
    taskContent.innerHTML = task.todoContent;
    taskItem.appendChild(taskContent);
  }
  let createdAt = document.createElement("h4");
  let clockIcon = document.createElement("i");
  clockIcon.classList.add("fas", "fa-clock");
  let createdAtSpan = document.createElement("span");
  createdAtSpan.innerHTML = task.todoCreatedAt;
  createdAt.appendChild(clockIcon);
  createdAt.appendChild(createdAtSpan);
  taskItem.appendChild(createdAt);
  activeTaskListContainer.appendChild(taskItem);
}

export { addTaskToActiveList };
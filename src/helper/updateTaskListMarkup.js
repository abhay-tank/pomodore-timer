import { taskList } from "../app.js";

// <div class="task-item">
//     <h1>Task Title</h1>
//     <h3>Task content</h3>
//     <h4>
//         <i class="fas fa-clock"></i>
//         created at
//     </h4>
// </div>;

// todoID;
// todoTitle;
// todoContent;
// todoCreatedAt;
// todoCompleted;
const updateTaskListMarkup = () => {
  let taskListContainer = document.getElementById("taskList");
  if (taskListContainer.hasChildNodes()) {
    taskListContainer.querySelectorAll("*").forEach((node) => node.remove());
  }
  taskList.forEach((task) => {
    let taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.id = task.todoID;
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
    createdAtSpan.innerHTML = task.todoCreatedAt.toGMTString();
    createdAt.appendChild(clockIcon);
    createdAt.appendChild(createdAtSpan);
    taskItem.appendChild(createdAt);
    taskListContainer.appendChild(taskItem);
  });
};

export { updateTaskListMarkup };

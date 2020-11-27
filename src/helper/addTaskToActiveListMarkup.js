// Add task as ActiveTask
const addTaskToActiveList = (task) => {
	let activeTaskListContainer = document.getElementById("activeTask");
	if (activeTaskListContainer.hasChildNodes()) {
		activeTaskListContainer
			.querySelectorAll("*")
			.forEach((node) => node.remove());
	}
	let taskItem = document.createElement("div");
	taskItem.classList.add("active-task-item");
	let taskTitle = document.createElement("h2");
	taskTitle.innerHTML = task.todoTitle;
	taskItem.appendChild(taskTitle);
	if (task.todoContent.length) {
		let taskContent = document.createElement("h3");
		taskContent.innerHTML = task.todoContent;
		taskItem.appendChild(taskContent);
	}
	let createdAt = document.createElement("h4");
	let clockIcon = document.createElement("i");
	clockIcon.classList.add("fas", "fa-clock", "fa-fw");
	let createdAtSpan = document.createElement("span");
	createdAtSpan.innerHTML = task.todoCreatedAt.toGMTString();
	createdAt.appendChild(clockIcon);
	createdAt.appendChild(createdAtSpan);
	taskItem.appendChild(createdAt);
	// Show TaskElapsed Time
	let timeElapsed = document.createElement("h5");
	let hourglass = document.createElement("i");
	hourglass.classList.add("fas", "fa-hourglass-end", "fa-fw");
	let hourGlassSpan = document.createElement("span");
	hourGlassSpan.appendChild(hourglass);
	timeElapsed.appendChild(hourGlassSpan);
	// Hours
	let activeTime = document.createElement("span");
	activeTime.id = "activeTime";
	timeElapsed.appendChild(activeTime);
	taskItem.appendChild(timeElapsed);
	activeTaskListContainer.appendChild(taskItem);
};

export { addTaskToActiveList };

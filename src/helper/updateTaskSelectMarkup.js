import { taskList } from "../app.js";

// Add task from tasklist to Select Input
const updateTaskSelect = () => {
	let selectInput = document.getElementById("selectTaskInput");
	selectInput.querySelectorAll("*").forEach((node) => node.remove());
	taskList.forEach((task) => {
		let option = document.createElement("option");
		option.value = task.todoID;
		option.innerHTML = task.todoTitle;
		selectInput.appendChild(option);
	});
};

export { updateTaskSelect };

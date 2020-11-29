import { Todo } from "./components/todo.js";
import {
	startTimer,
	pauseTimer,
	setWorkBreakTime,
	updatepomodoroUI,
	hardResetPomodoro,
} from "./components/pomodoroTimer.js";
import { updateTaskSelect } from "./helper/updateTaskSelectMarkup.js";
import { updateTaskListMarkup } from "./helper/updateTaskListMarkup.js";
import { addTaskToActiveList } from "./helper/addTaskToActiveListMarkup.js";
import * as controlButtons from "./components/controlButtons.js";

// All tasks will be added here
let taskList = [];

// Current Active task object will be held here
let currentTask;

window.onload = () => {
	controlButtons.pausePomodoroTimerButton.classList.add("disable");
	controlButtons.resetPomodoroTimerButton.classList.add("disable");
	controlButtons.completedTaskButton.classList.add("disable");
	showWorkMins();
	showBreakMins();
	updatepomodoroUI();
};

// Add new task from form
const addTask = (event) => {
	event.preventDefault();
	try {
		let taskTitle = document.forms.todoListInputForm.taskTitleInput.value;
		let taskContent = document.forms.todoListInputForm.taskDescription.value;
		console.log(taskTitle, taskContent);
		if (taskTitle.length) {
			let task = new Todo({
				todoID:
					(Math.random() * (100 - 1) + 1).toString() + Date.now().toString(),
				todoTitle: taskTitle,
				todoContent: taskContent,
				todoCreatedAt: new Date(),
				todoCompleted: false,
			});
			taskList.push(task);
			updateTaskSelect();
			updateTaskListMarkup();
			document.getElementById("taskTitle").value = "";
			document.getElementById("taskDescInput").value = "";
		} else {
			throw new Error("Task should have a title 😒");
		}
	} catch (error) {
		console.error(error);
		alert(error);
	}
};

// Fetch worktime and breaktime values and start timer.
const startPomodoro = () => {
	try {
		let workMins = document.getElementById("workMinsInput").value;
		let breakMins = document.getElementById("breakMinsInput").value;
		let selectedTask = document.getElementById("selectTaskInput").value;
		console.log(selectedTask);
		if (
			workMins >= 20 &&
			workMins <= 60 &&
			breakMins >= 5 &&
			breakMins <= 30 &&
			selectedTask.length &&
			selectedTask != ""
		) {
			document.getElementById("taskSelect").style.display = "none";
			let task = taskList.find((task) => task.todoID == selectedTask);
			currentTask = task;
			addTaskToActiveList(currentTask);
			setWorkBreakTime(workMins, breakMins);
			startTimer();
		} else {
			throw new Error("Enter valid input");
		}
	} catch (error) {
		console.error(error);
		alert(error);
	}
};

// Pausetimer... New function created if want to perform other task
//  not specific to timer on pause
const pausePomodoro = () => {
	pauseTimer();
};

// On task completion pause pomodoro timer and show
// task selection box and worktime and breaktime
const completedTask = () => {
	pauseTimer();
	controlButtons.completedTaskButton.classList.add("disable");
	document.getElementById("taskSelect").style.display = "flex";
	alert("Select New Task or Reset Pomodoro Timer");
	let taskIndex = taskList.findIndex((task) => task == currentTask);
	taskList.splice(taskIndex, 1);
	updateTaskSelect();
	updateTaskListMarkup();
	let activeTaskListContainer = document.getElementById("activeTask");
	if (activeTaskListContainer.hasChildNodes()) {
		activeTaskListContainer
			.querySelectorAll("*")
			.forEach((node) => node.remove());
	}
};

// Reset values of pomodoro but keep current task in active task list
const resetPomodoroTimer = () => {
	hardResetPomodoro();
};

// Fetch values from Work Range input and display value in work span
const showWorkMins = () => {
	let workMins = document.getElementById("workMinsInput").value;
	document.getElementById("workMins").innerHTML = workMins;
};

// Fetch values from Break Range input and display value in break span
const showBreakMins = () => {
	let breakMins = document.getElementById("breakMinsInput").value;
	document.getElementById("breakMins").innerHTML = breakMins;
};

// Dismiss instruction displayed onload
const closeInstructions = () => {
	document.getElementById("bannerSection").style.display = "none";
};

window.addTask = addTask;
window.startPomodoro = startPomodoro;
window.pausePomodoro = pausePomodoro;
window.resetTimer = resetPomodoroTimer;
window.completedTask = completedTask;
window.showWorkMins = showWorkMins;
window.showBreakMins = showBreakMins;
window.closeInstructions = closeInstructions;

// TaskList and currentTask exported to
// updateTaskListMarkup, updateTaskSelectMarkup and addTaskToActiveList respectively
export { taskList, currentTask };

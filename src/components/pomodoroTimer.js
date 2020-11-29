import * as controlButtons from "./controlButtons.js";
import { currentTask } from "../app.js";
let pomodoroInterval;
let time = {
	minutes: 0,
	seconds: 0,
};
let workMins = 0;
let breakMins = 0;
let work = 0;
let pause = false;

// Update Time
const updatepomodoroUI = () => {
	document.getElementById("displayTime").style.display = "flex";
	document.getElementById("status").style.display = "none";
	const minsContainer = document.getElementById("mins");
	const secsContainer = document.getElementById("secs");
	let min = String(time.minutes).padStart(2, "0");
	let sec = String(time.seconds).padStart(2, "0");
	minsContainer.innerHTML = min;
	secsContainer.innerHTML = sec;
};

// Set worktime or breaktime to countdown
const setWorkBreakTime = (workMin, breakMin) => {
	workMins = workMin;
	breakMins = breakMin;
	if (!pause) {
		// Check if first time... set Countdown time to WorkTime
		if (work == 0) {
			time = { minutes: workMins, seconds: 0 };
			work = true;
		} else if (work === true) {
			// Check if work cycle was executed.. set Countdown time to BreakTime
			time = { minutes: breakMins, seconds: 0 };
			work = false;
		} else {
			// Check if break cycle was executed.. set Countdown time to WorkTime
			time = { minutes: workMins, seconds: 0 };
			work = true;
		}
	}
	// If Pomodoro cycle is complete, time=00:00 and pause will be true
	// task is also completed
	else if (time.minutes == 0 && time.seconds == 0) {
		if (work == 0) {
			time = { minutes: workMins, seconds: 0 };
			work = true;
		} else if (work === true) {
			// Check if work cycle was executed.. set Countdown time to BreakTime
			time = { minutes: breakMins, seconds: 0 };
			work = false;
		} else {
			// Check if break cycle was executed.. set Countdown time to WorkTime
			time = { minutes: workMins, seconds: 0 };
			work = true;
		}
	}
};

// Pause Timer
const pauseTimer = () => {
	pause = true;
	clearInterval(pomodoroInterval);
	currentTask.pauseTimer();
	controlButtons.startPomodoroTimerButton.classList.remove("disable");
	controlButtons.pausePomodoroTimerButton.classList.add("disable");
	controlButtons.resetPomodoroTimerButton.classList.remove("disable");
	controlButtons.completedTaskButton.classList.remove("disable");
};

// On Cycle Complete clear interval
const resetTimer = () => {
	clearInterval(pomodoroInterval);
	controlButtons.startPomodoroTimerButton.classList.remove("disable");
	controlButtons.pausePomodoroTimerButton.classList.add("disable");
	controlButtons.completedTaskButton.classList.remove("disable");
	controlButtons.resetPomodoroTimerButton.classList.remove("disable");
	document.getElementById("audioFile").play();
	currentTask.pauseTimer();
	updatepomodoroUI();
	document.getElementById("displayTime").style.display = "none";
	document.getElementById("status").style.display = "flex";
	if (work === true) {
		document.getElementById("status").innerHTML = "Break Time";
	} else {
		document.getElementById("status").innerHTML = "Work Time";
	}
};

// Start pomodoro timer
const startTimer = () => {
	pause = false;
	currentTask.startTimer();
	controlButtons.startPomodoroTimerButton.classList.add("disable");
	controlButtons.pausePomodoroTimerButton.classList.remove("disable");
	controlButtons.completedTaskButton.classList.remove("disable");
	controlButtons.resetPomodoroTimerButton.classList.remove("disable");
	pomodoroInterval = setInterval(() => {
		if (time.seconds < 0) {
			time.minutes--;
			time.seconds = 59;
		}
		if (time.minutes <= 0 && time.seconds <= 0) {
			resetTimer();
		} else {
			updatepomodoroUI();
			time.seconds--;
		}
	}, 1000);
};

// Initialize values to 0
const hardResetPomodoro = () => {
	controlButtons.startPomodoroTimerButton.classList.remove("disable");
	controlButtons.pausePomodoroTimerButton.classList.add("disable");
	controlButtons.completedTaskButton.classList.remove("disable");
	controlButtons.resetPomodoroTimerButton.classList.add("disable");
	clearInterval(pomodoroInterval);
	work = 0;
	pause = 0;
	time = {
		minutes: 0,
		seconds: 0,
	};
	workMins = 0;
	breakMins = 0;
	currentTask.pauseTimer();
	updatepomodoroUI();
};

export {
	startTimer,
	pauseTimer,
	setWorkBreakTime,
	updatepomodoroUI,
	hardResetPomodoro,
};

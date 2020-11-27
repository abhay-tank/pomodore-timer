class TodoTimeTracker {
	todoInterval;
	time = {
		hours: 0,
		minutes: 0,
		seconds: 0,
	};

	updateActiveUI = () => {
		let activeTime = document.getElementById("activeTime");
		let hour = String(this.time.minutes).padStart(2, "0");
		let min = String(this.time.minutes).padStart(2, "0");
		let sec = String(this.time.seconds).padStart(2, "0");
		activeTime.innerHTML = `${hour} : ${min} : ${sec}`;
	};

	pauseTimer = () => {
		clearInterval(this.todoInterval);
	};

	resetTimer = () => {
		clearInterval(this.todoInterval);
		this.updateActiveUI();
		this.time = {
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
	};

	startTimer = () => {
		this.todoInterval = setInterval(() => {
			if (this.time.seconds > 59) {
				this.time.minutes++;
				this.time.seconds = 0;
			}
			if (this.time.minutes > 59) {
				this.time.hours++;
				this.time.minutes = 0;
			}
			if (this.time.hours >= 24) {
				resetTimer();
			}
			this.updateActiveUI();
			this.time.seconds++;
		}, 1000);
	};
}

class Todo extends TodoTimeTracker {
	todoID;
	todoTitle;
	todoContent;
	todoCreatedAt;
	todoCompleted;
	constructor({
		todoID = 0,
		todoTitle = "",
		todoContent = "",
		todoCreatedAt = 0,
		todoCompleted = false,
	}) {
		super();
		this.todoID = todoID;
		this.todoTitle = todoTitle;
		this.todoContent = todoContent;
		this.todoCreatedAt = todoCreatedAt;
		this.todoCompleted = todoCompleted;
	}
}

export { Todo };

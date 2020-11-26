class TodoTimeTracker {
  todoInterval;
  time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  timeElapsed = {
    hours: "",
    minutes: "",
    seconds: "",
  };

  pauseTimer = () => {
    clearInterval(this.todoInterval);
  };

  resetTimer = () => {
    clearInterval(this.todoInterval);
    this.time = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    let hr = String(time.hours).padStart(2, "0");
    let min = String(time.minutes).padStart(2, "0");
    let sec = String(time.seconds).padStart(2, "0");
    this.timeElapsed = {
      hours: hr,
      minutes: min,
      seconds: sec,
    };
  };

  startTimer = () => {
    todoInterval = setInterval(() => {
      if (time.seconds > 59) {
        time.minutes++;
        time.seconds = 0;
      }
      if (time.minutes > 59) {
        time.hours++;
        time.minutes = 0;
      }
      if (time.hours >= 24) {
        resetTimer();
      }
      let hr = String(time.hours).padStart(2, "0");
      let min = String(time.minutes).padStart(2, "0");
      let sec = String(time.seconds).padStart(2, "0");
      this.timeElapsed = {
        hours: hr,
        minutes: min,
        seconds: sec,
      };
      time.seconds++;
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

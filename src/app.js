import { Todo } from "./components/todo.js";
import {
  startTimer,
  pauseTimer,
  resetTimer,
  setTime,
  getTime,
} from "./components/pomodoroTimer.js";
import { updateTaskSelect } from "./helper/updateTaskSelectMarkup.js";
import { updateTaskListMarkup } from "./helper/updateTaskListMarkup.js";
const hrsContainer = document.getElementById("hrs");
const minsContainer = document.getElementById("mins");
const secsContainer = document.getElementById("secs");
let taskList = [];

window.onload = () => {
  showWorkMins();
  showBreakMins();
  setTime({
    hours: 0,
    minutes: 0,
    seconds: 3,
  });
  let time = getTime();
  let hr = String(time.hours).padStart(2, "0");
  let min = String(time.minutes).padStart(2, "0");
  let sec = String(time.seconds).padStart(2, "0");
  hrsContainer.innerHTML = hr;
  minsContainer.innerHTML = min;
  secsContainer.innerHTML = sec;
};

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

const showWorkMins = () => {
  let workMins = document.getElementById("workMinsInput").value;
  document.getElementById("workMins").innerHTML = workMins;
};

const showBreakMins = () => {
  let breakMins = document.getElementById("breakMinsInput").value;
  document.getElementById("breakMins").innerHTML = breakMins;
};

window.addTask = addTask;
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.showWorkMins = showWorkMins;
window.showBreakMins = showBreakMins;
export { taskList };

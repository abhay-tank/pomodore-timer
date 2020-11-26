let pomodoroInterval;
let time = {
  minutes: 0,
  seconds: 0,
};
let workMins = 0;
let breakMins = 0;
let work = 0;
let pause = false;

const updatepomodoroUI = () => {
  // let displayTime = document.getElementById("displayTime");
  // if (!displayTime.style.display) {
  //   displayTime.style.display = "flex";
  // }
  const minsContainer = document.getElementById("mins");
  const secsContainer = document.getElementById("secs");
  let min = String(time.minutes).padStart(2, "0");
  let sec = String(time.seconds).padStart(2, "0");
  minsContainer.innerHTML = min;
  secsContainer.innerHTML = sec;
};

const setTime = (newTime) => {
  time = newTime;
};

const setWorkBreakTime = (workMin, breakMin) => {
  workMins = workMin;
  breakMins = breakMin;
  if (!pause) {
    if (work == 0) {
      time = { minutes: workMins, seconds: 0 };
      work = true;
    } else {
      if (work === true) {
        time = { minutes: breakMins, seconds: 0 };
        work = false;
      } else {
        time = { minutes: workMins, seconds: 0 };
        work = true;
      }
    }
  }
}

const getTime = () => {
  return time;
};

const pauseTimer = () => {
  pause = true;
  clearInterval(pomodoroInterval);
};

const resetTimer = () => {
  document.getElementById("audioFile").play();
  clearInterval(pomodoroInterval);
  updatepomodoroUI();
  document.getElementById("displayTime").style.display = "none";
  document.getElementById("logoSection").style.display = "flex"
  document.getElementById("instructions").style.display = "none";
  if (work === true) {
    time = { minutes: breakMins, seconds: 0 };
    document.getElementById("logo-title").innerHTML = "Break Time"
    work = false;
  } else {
    time = { minutes: workMins, seconds: 0 };
    document.getElementById("logo-title").innerHTML = "Work Time"
  }
};

const startTimer = () => {
  pomodoroInterval = setInterval(() => {
    if (time.seconds < 0) {
      time.minutes--;
      time.seconds = 59;
    }
    if (time.minutes < 0) {
      resetTimer();
    }
    if (time.minutes <= 0 && time.seconds <= 0) {
      resetTimer();
    }
    updatepomodoroUI();
    time.seconds--;
  }, 100);
};

export { startTimer, pauseTimer, resetTimer, getTime, setTime, setWorkBreakTime };

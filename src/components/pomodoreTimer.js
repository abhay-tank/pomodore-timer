let pomodoreInterval;

let time = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const updatePomodoreUI = () => {
  const hrsContainer = document.getElementById("hrs");
  const minsContainer = document.getElementById("mins");
  const secsContainer = document.getElementById("secs");
  let hr = String(time.hours).padStart(2, "0");
  let min = String(time.minutes).padStart(2, "0");
  let sec = String(time.seconds).padStart(2, "0");
  hrsContainer.innerHTML = hr;
  minsContainer.innerHTML = min;
  secsContainer.innerHTML = sec;
};

const setTime = (newTime) => {
  time = newTime;
};

const getTime = () => {
  return time;
};

const pauseTimer = () => {
  clearInterval(pomodoreInterval);
};

const resetTimer = () => {
  clearInterval(pomodoreInterval);
  time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  console.log("Pomodore timer resetted");
  updatePomodoreUI();
};

const startTimer = () => {
  console.log("Timer started");
  pomodoreInterval = setInterval(() => {
    if (time.seconds < 0) {
      time.minutes--;
      time.seconds = 59;
    }
    if (time.minutes < 0) {
      time.hours--;
      time.minutes = 59;
    }
    if (time.hours < 0) {
      resetTimer();
    }
    updatePomodoreUI();
    time.seconds--;
  }, 1000);
};

export { startTimer, pauseTimer, resetTimer, getTime, setTime };

import { autoSolveSudoku } from "./script.js";

// TIMER
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector(".sudo-info__timer");
let interval = null;

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  // let ms =
  //   milliseconds < 10
  //     ? "00" + milliseconds
  //     : milliseconds < 100
  //     ? "0" + milliseconds
  //     : milliseconds;
  //  timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
  timerRef.innerHTML = ` ${h} : ${m} : ${s}`;
}

export function startTimer() {
  if (interval !== null) clearInterval(interval);
  interval = setInterval(displayTimer, 10);
}

export function pauseTimer() {
  clearInterval(interval);
}

export function resetTimer() {
  clearInterval(interval);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timerRef.innerHTML = "00 : 00 : 00 : 000 ";
}

// Listen to reset timer click
//   document.getElementById("resetTimer").addEventListener("click", () => {
//     clearInterval(int);
//     [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
//     timerRef.innerHTML = "00 : 00 : 00 : 000 ";
//   });


const solucionar = document.querySelector("#solucionar");
if (solucionar) solucionar.addEventListener("click", () => autoSolveSudoku());

// Listen to start timer click
const startTimerButton = document.getElementById("startTimer");
if (startTimerButton) startTimerButton.addEventListener("click", () => startTimer());

// Listen to pause timer click
const pausetTimerButton = document.getElementById("pauseTimer");
if(pausetTimerButton) pausetTimerButton.addEventListener("click", () => pauseTimer());

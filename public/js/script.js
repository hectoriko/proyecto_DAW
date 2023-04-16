import { addTemplate } from "./insert_templates.js";
import { loadYoutubeTutorials } from "./youtube_tutorials.js";
import { handleLogin } from "./login.js";
import { showModal, hideModal } from "./modal.js";


// const addTemplate = require('./insert_templates.js');

// TODO: Do something about this setTimeOut
setTimeout(function () {
  let selectedCell;
  let solution;
  let failCount = 0;

  // TIMER
  let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  let timerRef = document.querySelector(".sudo-info__timer");
  let interval = null;

  function handleNumberInput(e, key) {
    const isFixed = selectedCell.classList.contains("fixed");
    if (isFixed) return;

    // If on-screen keyboard is used
    if (e.type === "click") selectedCell.textContent = key.textContent;

    // If physical keyboard is used
    if (e.type === "keyup") {
      // Check key is 1 to 9
      const regex = /^[1-9]$/;
      if (regex.test(e.key)) selectedCell.textContent = e.key;
      else return;
    }

    checkCell();
    checkSudoku();
  }
  function preloadSudoku() {
    const chosenLvl = 'easy';

    const levelButton = document.querySelector(`.js-levels .js-button-lvl[data-level='${chosenLvl}']`);
    // Mark button as active
    levelButton.classList.add("sudo-button--bubble-active");

    // Show current level
    document.querySelector(".sudo-info__level span").textContent =  levelButton.textContent;

    // Start timer
    startTimer();

    const level = levelButton.dataset.level;
    callSudokuApi(level);
  };

  function callSudokuApi(level) {
    fetch(`/api/getRandom/${level}`)
      .then(response => response.json())
      .then(data => populateSudoku(data))
      .catch(e => console.error(e));
  }

  function populateSudoku(data) {
    solution = data.solution;
    const sudokuAsString = data.cells;

    // Add sudoku level and ID as data attributes to element
    const gameplate = document.querySelector("#sudo_gameplate");
    gameplate.setAttribute("data-sudo-level", data.level);
    gameplate.setAttribute("data-sudo-id", data._id);

    // Populate cells
    const allCells = document.querySelectorAll("#sudo_gameplate td div");
    allCells.forEach((cell, i) => {
      // Clear fixed / right / wrong
      cell.classList.remove("fixed", "is-right", "is-wrong");
      if (sudokuAsString[i] === ".") cell.textContent = "";
      else {
        cell.textContent = sudokuAsString[i];
        cell.classList.add("fixed");
      }
    });

    // Pre-select first empty cell
    const firstEmptyCell = document.querySelector(
      "#sudo_gameplate td div:not(.fixed)",
    );
    handleSelectionOfCell(firstEmptyCell);
  }

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

  function startTimer() {
    if (interval !== null) clearInterval(interval);
    interval = setInterval(displayTimer, 10);
  }

  function pauseTimer() {
    clearInterval(interval);
  }

  function resetTimer() {
    clearInterval(interval);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = "00 : 00 : 00 : 000 ";
  }

  function handleSelectionOfCell(cell) {
    // Clear previous selection
    const prevSelectedCell = document.querySelectorAll(".selected-cell");
    prevSelectedCell.forEach(cell => cell.classList.remove("selected-cell"));

    // Highlight current selection
    cell.classList.add("selected-cell");

    // TODO: Add highlighting of same row and same column cells

    // Assign new selection
    selectedCell = cell;
  }

  function handleFailCount() {
    if (failCount >= 3) console.log("3 fallos");
  }

  function checkCell() {
    const index = selectedCell.getAttribute("data-index");
    const num = selectedCell.textContent;

    // Clear previous classes
    selectedCell.classList.remove("is-right", "is-wrong");

    if (solution[index] === num) selectedCell.classList.add("is-right");
    else {
      selectedCell.classList.add("is-wrong");
      failCount++;
      handleFailCount();
    }
    // TODO: Add no-way class
  }

  function checkSudoku() {
    let allNumbers = Array.from(
      document.querySelectorAll("#sudo_gameplate td div"),
    );
    allNumbers = allNumbers.map(num => num.textContent);

    const allNumbersString = allNumbers.join("");

    // Check is sudoku is completed
    if (allNumbersString.length !== solution.length) return;

    // TODO: Add modal OK
    if (allNumbersString === solution) handleSudokuOK();
  }

  function autoSolveSudoku() {
    const allCells = document.querySelectorAll("#sudo_gameplate td div");
    allCells.forEach((cell, i) => {
      cell.classList.remove("fixed", "is-right", "is-wrong");
      cell.textContent = solution[i];
    });
    checkSudoku();
  }

  function handleSudokuOK() {
    pauseTimer();

    let time = document.querySelector(".sudo-info__timer").textContent;
    time = time.replaceAll(" ", "");
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const level = document
      .querySelector(".sudo-button--bubble-active")
      .getAttribute("data-level");

    const multiplier =
      level === "easy"
        ? 1
        : level === "medium"
        ? 1.5
        : level === "hard"
        ? 2
        : 0;

    // TODO: Add modal OK
    // console.log("Enhorabuena!");
    // console.log("🚀 ~ time", time);
    // console.log("🚀 ~ level", level);
    // console.log("🚀 ~ multiplier", multiplier);
    // // Save total seconds to back
    // console.log("🚀 ~ totalSeconds", totalSeconds);

    const sudokuOkModal = document.querySelector(".js-modal-sudoku-ok");

    sudokuOkModal.querySelector(".level").textContent = level
    sudokuOkModal.querySelector(".multiplicador").textContent = multiplier
    sudokuOkModal.querySelector(".time").textContent = time
    sudokuOkModal.querySelector(".puntos").textContent = '?'

    showModal(sudokuOkModal);
  }

  // Add listeners for level buttons
  document.querySelectorAll(".js-levels .js-button-lvl").forEach(button => {
    button.addEventListener("click", function () {
      for (let sibling of this.parentNode.parentNode.children) {
        sibling
          .querySelector(".js-button-lvl")
          .classList.remove("sudo-button--bubble-active");
      }
      // Mark button as active
      this.classList.add("sudo-button--bubble-active");

      // Show current level
      document.querySelector(".sudo-info__level span").textContent =
        button.textContent;

      // Reset failure count
      failCount = 0;

      // Reset timer & Start timer
      resetTimer();
      startTimer();

      const level = button.dataset.level;
      callSudokuApi(level);
    });
  });

  // Click on sudoku cell
  const allCells = document.querySelectorAll("#sudo_gameplate td div");
  allCells.forEach(cell => {
    cell.addEventListener("click", () => {
      handleSelectionOfCell(cell);
    });
  });

  // Use physical keyboard to input numbers



  // Use on-screen keyboard
  const keys = document.querySelectorAll(".sudo-keyboard__key");
  keys.forEach(key =>
    key.addEventListener("click", e => handleNumberInput(e, key)),
  );

  window.addEventListener("keyup", e => {
    // Check key is 1 to 9
    const regex = /^[1-9]$/;
    if (!regex.test(e.key)) return;
    handleNumberInput(e);
  });

  const solucionar = document.querySelector("#solucionar");
  solucionar.addEventListener("click", () => autoSolveSudoku());

  // Listen to start timer click
  const startTimerButton = document.getElementById("startTimer");
  startTimerButton.addEventListener("click", () => startTimer());

  // Listen to pause timer click
  const pausetTimerButton = document.getElementById("pauseTimer");
  pausetTimerButton.addEventListener("click", () => pauseTimer());

  // Listen to reset timer click
  //   document.getElementById("resetTimer").addEventListener("click", () => {
  //     clearInterval(int);
  //     [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  //     timerRef.innerHTML = "00 : 00 : 00 : 000 ";
  //   });


  // Load first sudoku


  preloadSudoku()

}, 2000);

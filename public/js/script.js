import { addTemplate } from "./insert_templates.js";
import { loadYoutubeTutorials } from "./youtube_tutorials.js";
import { handleLogin } from "./login.js";
// const addTemplate = require('./insert_templates.js');

// const sudoku = require('sudokutoolcollection');
// import SudokuToolCollection from "../node_modules/dist/sudokutoolcollection";
// import SudokuToolCollection from "../../node_modules/dist/sudokutoolcollection";
// import SudokuToolCollection from "sudokutoolcollection";
// const sudokuTool = SudokuToolCollection();

// const sudoku = require('sudokutoolcollection');

// import sudokuTool from '../scripts/solve.js';
// TODO: Do something about this setTimeOut
setTimeout(function () {
  let selectedCell;
  let solution;

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
      cell.classList.remove("fixed");
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

  // TIMER
  let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  let timerRef = document.querySelector(".sudo-info__timer");
  let int = null;

  document.getElementById("startTimer").addEventListener("click", () => {
    if (int !== null) clearInterval(int);
    int = setInterval(displayTimer, 10);
  });

  document.getElementById("pauseTimer").addEventListener("click", () => {
    clearInterval(int);
  });

  //   document.getElementById("resetTimer").addEventListener("click", () => {
  //     clearInterval(int);
  //     [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  //     timerRef.innerHTML = "00 : 00 : 00 : 000 ";
  //   });

  //////////////

  function handleSelectionOfCell(cell) {
    // Clear previous selection
    const prevSelectedCell = document.querySelectorAll(".selected-cell");
    prevSelectedCell.forEach(cell => cell.classList.remove("selected-cell"));

    // Highlight current selection
    cell.classList.add("selected-cell");

    // Assign new selection
    selectedCell = cell;
  }

  function checkCell() {
    const index = selectedCell.getAttribute("data-index");
    const num = selectedCell.textContent

    // TODO: Add class with valid/invalid
    if (solution[index] === num) console.log('Num. Correcto')
    else console.log('Num. incorrecto')
  }

  function checkSudoku() {
    const allNumbers = document.querySelectorAll("#sudo_gameplate td div")
    const arr = [];
    allNumbers.forEach(num => arr.push(num.textContent));

    const arrString = arr.join("");

    // TODO: Check if sudoku is actually completed
    // TODO: Add modal OK/KO
    if (arrString === solution) console.log('SUDOKU OK')
    else console.log('SUDOKU KO')
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

      // Reset timer
      clearInterval(int);
      [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
      // timerRef.innerHTML = "00 : 00 : 00 : 000 ";
      timerRef.innerHTML = "00 : 00 : 00";

      // Start timer
      if (int !== null) clearInterval(int);
      int = setInterval(displayTimer, 10);

      // Show current level
      const level = button.dataset.level;
      document.querySelector(".sudo-info__level span").textContent = level;

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
  window.addEventListener("keyup", e => {
    const isFixed = selectedCell.classList.contains("fixed");
    if (isFixed) return;

    if (e.key === "1" || e.keycode === 49) selectedCell.textContent = 1;
    if (e.key === "2" || e.keycode === 50) selectedCell.textContent = 2;
    if (e.key === "3" || e.keycode === 51) selectedCell.textContent = 3;
    if (e.key === "4" || e.keycode === 52) selectedCell.textContent = 4;
    if (e.key === "5" || e.keycode === 53) selectedCell.textContent = 5;
    if (e.key === "6" || e.keycode === 54) selectedCell.textContent = 6;
    if (e.key === "7" || e.keycode === 55) selectedCell.textContent = 7;
    if (e.key === "8" || e.keycode === 56) selectedCell.textContent = 8;
    if (e.key === "9" || e.keycode === 57) selectedCell.textContent = 9;

    checkCell()
    checkSudoku();
  });

  // Use on-screen keyboard
  const keys = document.querySelectorAll(".sudo-keyboard__key");
  keys.forEach(key => {
    key.addEventListener("click", () => {
      const isFixed = selectedCell.classList.contains("fixed");
      if (isFixed) return;
      selectedCell.textContent = key.textContent;

      checkCell()
      checkSudoku();
    });
  });


  const solucionar = document.querySelector('#solucionar');
  solucionar.addEventListener("click", () => {solveSudoku(solution)});

  function solveSudoku(solution) {
    const allCells = document.querySelectorAll("#sudo_gameplate td div");
    allCells.forEach((cell, i) => cell.textContent = solution[i]);
    checkSudoku();
  }

  /* Convertir cells en formato cadena a matriz */
  /* #region   */
  // function stringToArray(s) {
  //   const rows = [];
  //   const stringArray = s.split("");
  //   let row = [];
  //   for (const cell in stringArray) {
  //     row.push(stringArray[cell]);
  //     if (parseInt(cell) % 9 === 8) {
  //       rows.push(row);
  //       row = [];
  //     }
  //   }
  //   return rows;
  // }

  // function parseCell(cell) {
  //   return cell === "." ? "" : cell;
  // }
  /* #endregion */

}, 2000);
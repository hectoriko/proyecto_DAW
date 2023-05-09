import { addTemplate } from "./add_templates.js";
import { loadYoutubeTutorials } from "./youtube_tutorials.js";
// import { handleLogin } from "./login.js";
import { showModal, hideModal } from "./modal.js";
import { getRanking } from "./ranking.js";
import { getUsers } from "./users.js";
import { isLoggedIn } from "./login.js";
import { calculatePoints, updatePoints } from "./points.js";

import { startTimer, pauseTimer, resetTimer } from "./timer.js";

// Add templates
await addTemplate("./template-header", ".sudo-header");
await addTemplate("./template-footer", ".sudo-footer");
await addTemplate("./template-nav", ".sudo-nav");
await addTemplate("./template-sudoku", "#js-sudo-test2");

await isLoggedIn(); // Check if user is logged in
await getRanking(); // Get ranking
await getUsers(); // Get all users
preloadSudoku(); // Preload sudoku

const tutorialesContainer = document.querySelector(".sudo-tutoriales");
if (tutorialesContainer) loadYoutubeTutorials();

const currentYEar = new Date().getFullYear();
document.querySelector('.sudo-footer__year').innerHTML = currentYEar;

let selectedCell;
let solution;
let failCount = 0;

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

function updateFailCount(num) {
  // failCount = num;
  let failElement = document.querySelector(".contador-fallos");
  failElement.textContent = num;
}

function preloadSudoku(levelParam) {
  const tablero = document.querySelector('#sudo_gameplate')
  if (!tablero) return;

  updateFailCount(0);

  const chosenLvl = levelParam || "easy";

  const activeButton = document.querySelector(".sudo-button--bubble-active");
  if (activeButton) activeButton.classList.remove("sudo-button--bubble-active");

  const levelButton = document.querySelector(
    `.js-levels .js-button-lvl[data-level='${chosenLvl}']`,
  );
  // Mark button as active
  levelButton.classList.add("sudo-button--bubble-active");

  // Show current level
  document.querySelector(".sudo-info__level span").textContent =
    levelButton.textContent;

  const level = levelButton.dataset.level;
  getSudoku(level);
}

function getSudoku(level) {
  fetch(`/api/getRandom/${level}`)
    .then(response => response.json())
    .then(data => populateSudoku(data))
    .then(() => {
      resetTimer();
      startTimer();
    })
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

function handleSelectionOfCell(cell) {
  // Assign new selection
  selectedCell = cell;

  // Helper obj
  const positions = {
    1: [0, 1, 2],
    2: [0, 1, 2],
    3: [0, 1, 2],
    4: [3, 4, 5],
    5: [3, 4, 5],
    6: [3, 4, 5],
    7: [6, 7, 8],
    8: [6, 7, 8],
    9: [6, 7, 8],
  };

  // Clear all prev classes
  const allCells = Array.from(
    document.querySelectorAll(`#sudo_gameplate td div`),
  );
  allCells.forEach(cell =>
    cell.classList.remove("selected-cell", "highlighted-cell", "same-num-cell"),
  );

  // Get cells to highlight
  const sameRowCells = cell.parentNode.parentNode.querySelectorAll("td div");
  const positionOfCell = Array.from(sameRowCells).indexOf(cell) + 1;
  const sameColumnsCells = document.querySelectorAll(
    `#sudo_gameplate tr td:nth-child(${positionOfCell}) div`,
  );

  const allRows = document.querySelectorAll("#sudo_gameplate tr");
  const selectedRow = cell.parentNode.parentNode;
  const positionOfRow = Array.from(allRows).indexOf(selectedRow) + 1;

  const thisSquareCells = allCells.filter(
    ce =>
      positions[positionOfRow].includes(parseInt(ce.dataset.x)) &&
      positions[positionOfCell].includes(parseInt(ce.dataset.y)),
  );

  const allHiglightsCell = [
    ...sameRowCells,
    ...sameColumnsCells,
    ...thisSquareCells,
  ];

  // Get cells with same number, not empty, and not the selected one
  const sameNunCells = allCells.filter(
    ce =>
      ce.textContent === cell.textContent &&
      ce.textContent !== "" &&
      ce !== cell,
  );

  // Add classes
  cell.classList.add("selected-cell"); // Highlight SELECTED cell
  allHiglightsCell.forEach(node => node.classList.add("highlighted-cell")); // Highlight HIGHLITED cells
  sameNunCells.forEach(cell => cell.classList.add("same-num-cell")); // Highlight SAME-NUM cells
}

function handleFailCount() {
  if (failCount >= 3) console.log("3 fallos");
  const gameOverModal = document.querySelector(".js-modal-game-over");
  if (failCount >= 3) showModal(gameOverModal);
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
    updateFailCount(failCount);
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

  if (allNumbersString === solution) handleSudokuOK();
}

export function autoSolveSudoku() {
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
  const timeTaken = hours * 3600 + minutes * 60 + seconds; // In seconds

  const level = document
    .querySelector(".sudo-button--bubble-active")
    .getAttribute("data-level");

  // Adjust multipler according to difficulty
  const multiplier =
    level === "easy" ? 1 : level === "medium" ? 1.5 : level === "hard" ? 2 : 0;

  const points = calculatePoints(level, timeTaken, multiplier);
  updatePoints(points);

  setTimeout(() => {
    getRanking();
  }, 1000);

  const sudokuOkModal = document.querySelector(".js-modal-sudoku-ok");

  sudokuOkModal.querySelector(".level").textContent = level;
  sudokuOkModal.querySelector(".multiplicador").textContent = multiplier;
  sudokuOkModal.querySelector(".time").textContent = time;
  sudokuOkModal.querySelector(".puntos").textContent = points;

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
    updateFailCount(0);

    const level = button.dataset.level;
    getSudoku(level);
  });
});

// Click on sudoku cell
const allCells = document.querySelectorAll("#sudo_gameplate td div");
allCells.forEach(cell => {
  cell.addEventListener("click", () => {
    handleSelectionOfCell(cell);
  });
});


// Use on-screen keyboard
const keys = document.querySelectorAll(".sudo-keyboard__key");
keys.forEach(key =>
  key.addEventListener("click", e => handleNumberInput(e, key)),
);

// Use physical keyboard to input numbers
window.addEventListener("keyup", e => {
  const modals = document.querySelectorAll(".sudo-modal");
  let modalIsOpen = false;
  modals.forEach(modal => {
    if (modal.classList.contains("sudo-modal--active")) modalIsOpen = true;
  });

  if (modalIsOpen) return;

  // Check key is 1 to 9
  const regex = /^[1-9]$/;
  if (!regex.test(e.key)) return;
  handleNumberInput(e);

  // TODO: add support for arrow keys on physical keyboard
});

const closeGameOverModal = document.querySelector(
  ".js-modal-game-over .js-close-modal",
);

if (closeGameOverModal) {
  closeGameOverModal.addEventListener("click", function () {
    const gameOverModal = document.querySelector(".js-modal-game-over");
  
    hideModal(gameOverModal);
  
    setTimeout(() => preloadSudoku(), 500);
  });
}

const closeSudokuOkModal = document.querySelector(
  ".js-modal-sudoku-ok .js-close-modal",
);

if (closeSudokuOkModal) {
  closeSudokuOkModal.addEventListener("click", function () {
    const sudokuOkModal = document.querySelector(".js-modal-sudoku-ok");

    hideModal(sudokuOkModal);

    const activeLevel = document
      .querySelector(".sudo-button--bubble-active")
      .getAttribute("data-level");

    let nextLevel = "";
    activeLevel === "easy"
      ? (nextLevel = "medium")
      : activeLevel === "medium"
      ? (nextLevel = "hard")
      : activeLevel === "hard"
      ? (nextLevel = "hard")
      : "easy";

    setTimeout(() => preloadSudoku(nextLevel), 500);
  });
}

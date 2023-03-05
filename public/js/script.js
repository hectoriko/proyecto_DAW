import { addTemplate } from "./insert_templates.js";
import { loadYoutubeTutorials } from "./youtube_tutorials.js";
import { handleLogin } from "./login.js";

// const addTemplate = require('./insert_templates.js');z
// console.log("🚀 - addTemplate:", addTemplate)

console.log("If you can read this, the file has loaded")

setTimeout(function () {
   document.querySelectorAll('.js-button-lvl').forEach(button => {
      button.addEventListener('click', () => {
         const level = button.dataset.level;
         callApi(level)
      })
    })
}, 2000)

function callApi(level) {
   fetch(`/api/getRandom/${level}`)
   .then((response) => response.json())
   .then((data) => {
      console.log("🚀 - data:", data)
      const sudoku = document.querySelector(".sudo-sudoku");
      
      let sudokuAsString = data.cells;
      let sudokuAsArray = stringToArray(sudokuAsString)
      
      // const test = document.getElementById("test");
      // const template = /*html*/ `
      //    <p>ID ${data._id}</p>
      //    <p>Level ${data.level}</p>
      //    <p>Cells: ${data.cells}</p>
      //    `;
      // test.innerHTML = template;

      let sudokuTemplate = /*html*/ `
         <table>
            <caption>
               <span>Sudoku</span> <br />
               <span>Level: ${data.level}</span> <br />
               <span>ID: ${data._id}</span>
            </caption>
            
            <colgroup><col><col><col>
            <colgroup><col><col><col>
            <colgroup><col><col><col>`;

      sudokuAsArray.forEach(function(row, i) {
         if (i == 0 || i == 3 || i == 6) sudokuTemplate += /*html*/`<tbody>`;
         sudokuTemplate += /*html*/ `<tr>`;
         row.forEach(cell => sudokuTemplate += /*html*/ `<td>${parseCell(cell)}`)
      })
      sudokuTemplate += /*html*/ `</table>`;

      sudoku.innerHTML = '';
      sudoku.innerHTML = sudokuTemplate;
   })
   .catch(e => console.error(e));
}

/* Convertir cells en formato cadena a matriz */
function stringToArray(s) {
    const rows = [];
    const stringArray = s.split('');
    let row = [];
    for (const cell in stringArray) {
        row.push(stringArray[cell]);
        if (parseInt(cell) % 9 === 8) {
            rows.push(row);
            row = [];
        }
    }
    return rows;
}

function parseCell(cell) {
   return cell === '.' ? '' : cell;
}

 
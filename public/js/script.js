console.log("If you can read this, the file has loaded")

document.querySelectorAll('.button-lvl').forEach(button => {
   button.addEventListener('click', () => {
      let level = button.dataset.level;
      callApi(level)
   })
 })

function callApi(level) {
   fetch(`/api/getRandom/${level}`)
   .then((response) => response.json())
   .then((data) => {
      let test = document.getElementById("test");

      // let sudokuTable = data.cells;
      // let sudokuTemplate = '<caption>Sudoku of the day</caption><colgroup><col><col><col>      <colgroup><col><col><col><colgroup><col><col><col>';

      // sudokuTable.forEach(number, index) {

      // };

      let template = /*html*/ `
         <p>ID ${data._id}</p>
         <p>Level ${data.level}</p>
         <p>Cells: ${data.cells}</p>
         `;
      test.innerHTML = template;
   })
   .catch(e => console.error(e));
}


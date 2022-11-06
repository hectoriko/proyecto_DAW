console.log("If you can read this, the file has loaded")

document.querySelectorAll('.button-lvl').forEach(button => {
   button.addEventListener('click', () => {
      const level = button.dataset.level;
      callApi(level)
   })
 })

function callApi(level) {
   fetch(`/api/getRandom/${level}`)
   .then((response) => response.json())
   .then((data) => {
      const test = document.getElementById("test");

      // let sudokuTable = data.cells;
      // let sudokuTemplate = '<caption>Sudoku of the day</caption><colgroup><col><col><col>      <colgroup><col><col><col><colgroup><col><col><col>';

      // sudokuTable.forEach(number, index) {

      // };

      const template = /*html*/ `
         <p>ID ${data._id}</p>
         <p>Level ${data.level}</p>
         <p>Cells: ${data.cells}</p>
         `;
      test.innerHTML = template;
   })
   .catch(e => console.error(e));
}

function stringToArray(s) {
    const rows = [];
    const stringArray = s.split('');
    let row = [];
    for (const cell in stringArray) {
        row.push(stringArray[cell]);
        if (parseInt(cell) % 9 == 8) {
            rows.push(row);
            row = [];
        }
    }
    return rows;
}

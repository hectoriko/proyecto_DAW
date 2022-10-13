const sudoku = require('sudokutoolcollection');
const mongoose = require('mongoose');
const { puzzleSchema } = require('../model/Sudoku.js')

// Nos conectamos a la bbdd
mongoose.connect('mongodb://localhost:27017/sudoku', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Succesfull conection to the sudoku database <3');
    })
    .catch((err) => {
        console.log('Error connecting to sudoku database >:');
        console.log(err);
    })

// creamos el tipo Puzzle
const Puzzle = mongoose.model('Puzzle', puzzleSchema);

/*
 * Esta función nos crea el objeto Puzzle y nos los guarda en la bbdd.
 * Para ver `level's válidos, referirte a la página de sudokutoolcollection:
 * https://www.npmjs.com/package/sudokutoolcollection
 */
function createPuzzleIntoDB(level) {
    var puzzle = new Puzzle();
    puzzle.level = level;
    puzzle.cells = sudoku().generator.generate(level)
    puzzle.save();
}

// Creamos 16 puzzles difíciles, 16 medios y 16 fáciles. ¿Porqué 16? Porqué no.
for (var i = 0; i < 16; i++) {
    createPuzzleIntoDB("hard");
    createPuzzleIntoDB("medium");
    createPuzzleIntoDB("easy");
}

const sudoku = require('sudokutoolcollection');
const mongoose = require('mongoose');
const { puzzleSchema } = require('../model/Sudoku.js')
const mongoConnection = 'mongodb+srv://sudokle:IFPsudokle@cluster0.nrrxukw.mongodb.net/sudokle'

// Nos conectamos a la bbdd
mongoose.connect(mongoConnection, { 
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
 * Esta función nos devuelve un objeto `Puzzle'.
 * Para ver `level's válidos, referirte a la página de sudokutoolcollection:
 * https://www.npmjs.com/package/sudokutoolcollection
 */
function createPuzzle(level) {
    const puzzle = new Puzzle();
    puzzle.level = level;
    puzzle.cells = sudoku().generator.generate(level)
    return puzzle;
}

function addPuzzleToDB(puzzle) {
    puzzle.save();
}


// Creamos 16 puzzles difíciles, 16 medios y 16 fáciles. ¿Porqué 16? Porqué no.
for (let i = 0; i < 16; i++) {
    addPuzzleToDB(createPuzzle("hard"));
    addPuzzleToDB(createPuzzle("medium"));
    addPuzzleToDB(createPuzzle("easy"));
    console.log('Has creado tres puzles de varias dificultades.')
}

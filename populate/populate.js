const sudoku = require('sudokutoolcollection');
const mongoose = require('mongoose');
const { puzzleSchema } = require('../model/Sudoku.js')

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


const Puzzle = mongoose.model('Puzzle', puzzleSchema);

function createPuzzleIntoDB(level) {
    var puzzle = new Puzzle();
    puzzle.level = level;
    puzzle.cells = sudoku().generator.generate(level)
    puzzle.save();
}

for (var i = 0; i < 16; i++) {
    createPuzzleIntoDB("hard");
    createPuzzleIntoDB("medium");
    createPuzzleIntoDB("easy");
}

/*
 * Este script nos permite popular la base de datos MongoDB Atlas con 48 puzles
 * de diferentes dificultades.
 */
const sudoku = require('sudokutoolcollection');
const mongoose = require('mongoose');
const dbConfig = require('../configs/db.config.js');
const Puzzle = require('../models/puzzle.js')

const dburl = dbConfig.url;

/*
 * Nos conectamos a MongoDB Atlas. Esta conexión es independiente de la que
 * hacemos en /src/app.js, ya que:
 * 1) No requeremos la principal para ejecutar este script.
 * 2) Es puntual y nos desconectamos al final del script.
 */
mongoose.connect(dburl, { 
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

/*
 * Esta función nos devuelve un objeto de tipo `Puzzle'.
 * Para ver `level's válidos, referirte a la página de sudokutoolcollection:
 * https://www.npmjs.com/package/sudokutoolcollection
 */
function createPuzzle(level) {
    const puzzle = new Puzzle();
    puzzle.level = level;
    puzzle.cells = sudoku().generator.generate(level)
    return puzzle;
}

/* Esta función guarda un objeto de "tipo" `Puzzle' en la base de datos. */
function addPuzzleToDB(puzzle) {
    puzzle.save()
    .catch((err) => {
      console.log(err);
    });
}


/* Creamos 16 puzzles difíciles, 16 medios y 16 fáciles. ¿Porqué 16? Porqué no. */
for (let i = 0; i < 16; i++) {
    addPuzzleToDB(createPuzzle("hard"));
    addPuzzleToDB(createPuzzle("medium"));
    addPuzzleToDB(createPuzzle("easy"));
    console.log('Has creado tres puzles de varias dificultades.')
}

mongoose.connection.close();

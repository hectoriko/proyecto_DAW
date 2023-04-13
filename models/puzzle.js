/*
 * Esquema de los puzles en la base de datos.
 */
const mongoose = require('mongoose');

/*
 * El formato de los puzles que guarda la base de datos, y el que manda la API.
 * Los valores cells son del formato "..3.19..234[...]34..2412..": 
 * Cada caracter representa una celda de sudoku, los puntos son celdas vacias.
 */
const puzzleSchema = mongoose.Schema({
    level: {
        type: String,
        required: true,
        enum : ['easy', 'medium', 'hard']
    },
    cells: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Puzzle', puzzleSchema);

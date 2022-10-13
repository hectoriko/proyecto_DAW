const mongoose = require('mongoose')

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

// {Por ahora} lo único que necesita este modulo es populate/populate.js, el
// script que popula la base de datos, lo cual no se hace frequentemente.
module.exports = { puzzleSchema };

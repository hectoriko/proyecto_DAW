const mongoose = require('mongoose')

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

module.exports = { puzzleSchema };

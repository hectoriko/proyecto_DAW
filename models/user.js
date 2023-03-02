/*
 * Esquema de usuarios en la base de datos.
 */
const mongoose = require('mongoose');

/* El modelo de usuarios */
const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password_hash: {
    type: String,
    required: true
  },
  solved_puzzles: {
    type: Array
  },
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
  
});

/* objeto para guardar tiempos de puzles */
class Puzzle_time {
  constructor(puzzle_id, time){
    this.puzzle_id = puzzle_id;
    this.time = time;
  }
}

module.exports = mongoose.model('User', userSchema);

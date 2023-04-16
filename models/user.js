/*
 * Esquema de usuarios en la base de datos.
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 8;
const SECRET = process.env.SECRET;
require('dotenv').config()

/* El modelo de usuarios */
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  },
  // solved_puzzles: {
  //   type: Array
  // },
  // full_name: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // dob: {
  //   type: Date,
  //   required: true
  // },
  // points: {
  //   type: Number,
  //   required: true
  // }
});

/* Método para guardar nuevo usuario */
userSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(salt, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/* Método para comprobar hash de contraseña */
userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(next);
    cb(null, isMatch);
  });
}

/* Método para generar token */
userSchema.methods.generateToken = function(cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), SECRET);

  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
}

/* Método para encontrar un token, nos confirma si un usuario ha iniciado sesión */
userSchema.statics.findByToken = function(token, cb) {
  const user = this;
  jwt.verify(token, SECRET, (err, decode) => {
    user.findOne({"_id": decode, "token": token}, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
}

/* Método para borrar token si el usuario cierra la sesión */
userSchema.methods.deleteToken = function(token, cb) {
  const user = this;
  user.update({$unset : {token : 1}}, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
}
// /* objeto para guardar tiempos de puzles */
// class Puzzle_time {
//   constructor(puzzle_id, time){
//     this.puzzle_id = puzzle_id;
//     this.time = time;
//   }
// }


module.exports = mongoose.model('User', userSchema);

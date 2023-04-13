/*
 * Rutas a BBDD
 */
const express = require('express');
const Puzzle = require('../models/puzzle.js') 
const router = express.Router();
module.exports = router;



/*
 * Esta ruta nos permite obtener de la BBDD un objeto puzzle del nivel pasado
 * como parametro, por ahora tenemos:
 * /api/getRandom/hard
 * /api/getRandom/medium
 * /api/getRandom/easy
 */
router.get('/getRandom/:level', async (req, res) => {
    try {
        const level = req.params.level;
        await Puzzle.countDocuments({level: level}).exec((err, count) => {
            const random = Math.floor(Math.random() * count);
            Puzzle.findOne({level: level}).skip(random).exec((err, puzzle) => {
                res.json(puzzle);
            });
        });
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

/* Ruta a todos los objetos puzzle en la BBDD. */
router.get('/getAll', async (req, res) => {
    try {
        const puzzles = await Puzzle.find();
        res.json(puzzles);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

//////////////////////////////////////////////////////

// ! Login
// const mongoose = require('mongoose');
// const session = require('express-session');
// const app = express();


// Configure express-session middleware
// app.use(session({
//     secret: 'myappsecret',
//     resave: false,
//     saveUninitialized: true
//   }));

// ! Intento de login Hector
// user_name: // type: String 
// password_hash: // type: String, 
// solved_puzzles: // type: Array 
// full_name: // type: String, 
// dob: // type: Date,  
// points: // type: Number

// // /users/:userId/password/:password
// router.get('/login/:user_name', async (req, res) => {
//     try {
//         const user = req.params.user_name;
//         console.log("🚀 BACK - user:", user)
        
//     } catch(err) {
//         res.status(500).json({message: err.message});
//     }
// });

// Define a route for login requests
// app.post('/login', async (req, res) => {
//     // const { username, password } = req.body;
//     const { user_name,
//         password_hash,
//         solved_puzzles,
//         full_name,
//         dob,
//         points } = req.body;
//         // const user = await User.findOne({ user_name, password_hash });
//         console.log("🚀 - user_name:", user_name)
//         console.log("🚀 - password_hash:",  password_hash)
        
//     // if (user) {
//     //   req.session.userId = user._id;
//     //   res.redirect('/');
//     // } else {
//     //   res.send('Invalid username or password');
//     // }
//   });

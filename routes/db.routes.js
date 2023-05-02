/*
 * Rutas a BBDD
 */
const express = require('express');
const Puzzle = require('../models/puzzle.js');
// const User = require('../models/user.js');
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

/* Ruta a todos los usuarios */
// router.get('/getUsers', async (req, res) => {
//     try {
//         let users = await User.find();
//         res.json(users);
//     } catch(err) {
//         res.status(500).json({message: err.message});
//     }
// });

/* Ruta a todos los por orden de puntos */
// router.get('/getRanking', async (req, res) => {
//     try {
//         let users = await User.find();
//         // Sort users by points
//         users = users.sort((a, b) => b.points - a.points);
//         res.json(users);
//     } catch(err) {
//         res.status(500).json({message: err.message});
//     }
// });
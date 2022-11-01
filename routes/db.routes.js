/*
 * Rutas a BBDD
 */
const express = require('express');
const Puzzle = require('../models/puzzle.js') 
const router = express.Router();
module.exports = router;

/* Esta ruta nos permite obtener de la BBDD un objeto puzzle del nivel pasado
 * como parametro, por ahora tenemos:
 * /api/getRandom/hard
 * /api/getRandom/medium
 * /api/getRandom/easy
 */
router.get('/getRandom/:level', (req, res) => {
    try {
        const level = req.params.level;
        Puzzle.countDocuments({level: level}).exec(function (err, count) {
            const random = Math.floor(Math.random() * count);
            Puzzle.findOne({level: level}).skip(random).exec(function (err, puzzle) {
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

/*
 * Declaración de las rutas para POST GET PUSH DELELTE etc...
 * Lo que viene siendo el API.
 */
const express = require('express');
const Puzzle = require('../models/puzzle.js') 
const router = express.Router();
module.exports = router;

// Por ahora solo necesitamos GET puzles, dejo el resto comentadas como ejemplos.

// Todavía no entiendo que hace exactamente async y await, pero son necesarios
// para que funcione el codigo 😅. Si no me da un error de nosequé circular
// json.
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

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const puzzles = await Puzzle.find();
        res.json(puzzles);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

//
////GET by ID
// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// });

////Get by ID Method
//router.get('/getOne/:id', (req, res) => {
//    res.send('Get by ID API')
//})

//Post Method
// router.post('/post', (req, res) => {
//     res.send('Post API')
// })

////Update by ID Method
//router.patch('/update/:id', (req, res) => {
//    res.send('Update by ID API')
//})

////Delete by ID Method
//router.delete('/delete/:id', (req, res) => {
//    res.send('Delete by ID API')
//})

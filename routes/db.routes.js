/*
 * Declaración de las rutas para POST GET PUSH DELELTE etc...
 * Lo que viene siendo el API.
 */
const express = require('express');
const Puzzle = require('../models/puzzle.js') 
const router = express.Router();
module.exports = router;

// Por ahora solo necesitamos GET puzles, dejo el resto comentadas como ejemplos.

/* GET puzzle aleatorio de nivel "hard" */
// TODO poder insertar nivel requerido como argumento.
// Todavía no entiendo que hace exactamente async y await, pero son necesarios
// para que funcione el codigo 😅. Si no me da un error de nosequé circular
// json.
router.get('/getRandomHard', async (req, res) => {
    const count = Puzzle.estimatedDocumentCount();
    const random = Math.floor(Math.random() * count);
    try {
        const data = await Puzzle.findOne({level: "hard"}).skip(random);
        res.json(data)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const puzzles = await Puzzle.find();
        res.json(puzzles)
    } catch(err) {
        res.status(500).json({message: err.message})
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

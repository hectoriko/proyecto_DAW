/*
 * Declaración de las rutas para index.html
 */
const express = require('express');
const router = express.Router();
const path = require('path')
module.exports = router;

/* Routa a views/index.html*/
// No me mola lo de `..' en la cadena. TODO Hacer que me guste.
router.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', '/views/index.html'))
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

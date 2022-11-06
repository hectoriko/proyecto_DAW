/*
 * Declaración de las rutas para views.html
 */
const express = require('express');
const path = require('path')
const router = express.Router();

/* Ruta a views/index.html*/
// No me mola lo de `..' en la cadena. TODO Hacer que me guste.
router.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', '/views/index.html'))
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

router.get('/:page', (req, res) => {
    try {
        const page = req.params.page;
        res.sendFile(path.join(__dirname, '..', `/views/${page}.html`))
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

/* EXPORTS */
module.exports = router;

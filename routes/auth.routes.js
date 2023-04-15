/*
 * Declaración de las rutas para autentificación
 */
const express = require('express');
const path = require('path')
const router = express.Router();
const body_parser = require('body_parser');
const app = require('../app');

/* Ruta a views/index.html*/
router.get('/login', (req, res) => {
  try {
    if (req.session.loggedIn)
      res.redirect('/')
    res.sendFile(path.join(__dirname, '..', '/views/index.html'))
  } catch(err) {
    res.status(500).json({message: err.message})
  }
});

/* Ruta a todo el resto de páginas .html en views/ */
router.get('/:page', (req, res) => {
    try {
        const page = req.params.page;
        res.sendFile(path.join(__dirname, '..', `/views/${page}.html`))
    } catch(err) {
        res.status(404).json({message: err.message});
    }
});

/* EXPORTS */
module.exports = router;

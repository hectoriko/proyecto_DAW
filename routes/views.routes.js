/*
 * Declaración de las rutas para views/
 */

/* Módulos */
const express = require('express');
const path    = require('path')
const router  = express.Router();

/* Ruta a views/index.html*/
router.get('/', (_req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', '/views/index.html'))
  } catch(err) {
    res.status(500).json({message: err.message})
  }
});

/*
 * Ruta a todo el resto de páginas. Esto funciona para cualquier archivo .html
 * en la carpeta de views.
 */
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

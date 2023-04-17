/*
 * Lógica y rutas de la aplicación.
 */

/* Módulos externos */
const express  = require('express');
const mongoose = require('mongoose');
const favicon  = require('serve-favicon');
const path     = require('path');
const app      = express();

/* Módulos Internos */
const db_routes    = require('./routes/db.routes');
const db_configs   = require('./configs/db.configs');
const views_routes = require('./routes/views.routes')
const auth_routes  = require('./routes/auth.routes')
const db_url       = db_configs.url;

/* Cargamos favicon */
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));

/* Utilizamos las rutas de ./routes/db.routes.js: APIs */
app.use('/api', db_routes);

/* Utilizamos las rutas de ./routes/auth.routes.js: Autentificación */
app.use('/auth', auth_routes);

/* Utilizamos las rutas de ./routes/views.routes.js: páginas */
app.use('/', views_routes);

/* Conectamos CSS, JS e Imagenes */
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));

/* Conectamos la BBDD */
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Succesfull conection to the sudoku database <3');
  })
  .catch((err) => {
    console.log('Error connecting to sudoku database >:');
    console.log(err);
  });

module.exports = app;

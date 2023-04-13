const express = require('express');
const mongoose = require('mongoose');
const db_routes = require('./routes/db.routes');
const db_configs = require('./configs/db.configs');
const views_routes = require('./routes/views.routes')
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const db_url = db_configs.url;

/* Cargamos favicon */
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')))

/* Utilizamos las rutas de ./routes/db.routes.js: APIs */
app.use('/api', db_routes);

/* Utilizamos las rutas de ./routes/views.routes.js: páginas */
app.use('/', views_routes);

/* Conectamos CSS, JS e Imágenes */
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));

/* Utilizamos cookie-session para guardar en lado cliente */
app.use({
  name: "sudokle-session",
  // El secreto debeía ser generado aleatoriamente, seguramente?
  secret: "PRUEBA-CAMBIAR",
  httpOnly: true,
});

/* Nos connectamos a la bbdd */
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

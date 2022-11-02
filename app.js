const express = require('express');
const mongoose = require('mongoose');
const db_routes = require('./routes/db.routes');
const db_configs = require('./configs/db.configs');
const index_routes = require('./routes/index.routes')
const app = express();
const db_url = db_configs.url;

/* Utilizamos las rutas de ./routes/db.routes.js */
app.use('/api', db_routes);

/* Utilizamos las rutas de ./routes/index.routes.js */
app.use('/', index_routes);

/* Escumchamos peticiones locales */
app.listen(3000, () => {
    console.log('Server listening on 3000');
})


// Conectamos hoja de estilos
app.use(express.static(__dirname + '/public/'));

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



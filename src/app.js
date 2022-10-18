const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const dbconfig = require('./configs/db.config');
const dburl = dbconfig.url;

// Utilizamos las rutas de ./routes/routes.js
app.use('/api', routes);

// Escumchamos peticiones locales
app.listen(3000, () => {
    console.log('Server listening on 3000');
})

// Nos connectamos a la bbdd
mongoose.connect(dburl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Succesfull conection to the sudoku database <3');
    })
    .catch((err) => {
        console.log('Error connecting to sudoku database >:');
        console.log(err);
    })


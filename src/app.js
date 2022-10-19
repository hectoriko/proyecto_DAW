const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/db.route');
const dbconfig = require('./configs/db.config');
const app = express();
const dburl = dbconfig.url;

// Utilizamos las rutas de ./routes/db.route.js
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


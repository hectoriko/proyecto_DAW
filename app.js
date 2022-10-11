const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Escumchamos peticiones locales
app.listen(3000, () => {
    console.log('Server listening on 3000');
})

// Nos connectamos a la bbdd
mongoose.connect('mongodb://localhost:27017/sudoku', { 
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


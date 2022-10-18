const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoConnection = 'mongodb+srv://sudokle:IFPsudokle@cluster0.nrrxukw.mongodb.net/sudokle'

// Escumchamos peticiones locales
app.listen(3000, () => {
    console.log('Server listening on 3000');
})

// Nos connectamos a la bbdd
mongoose.connect(mongoConnection, { 
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


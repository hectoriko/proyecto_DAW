/*
 * Configuración para la conexión a MongoDB Atlas.
 */
require('dotenv').config()
const user = process.env.ATLAS_USER;
const pass = process.env.ATLAS_PASS;
const bbdd = "sudokle";
const url = `mongodb+srv://${user}:${pass}@cluster0.nrrxukw.mongodb.net/${bbdd}`;

module.exports = {
    url: url
};

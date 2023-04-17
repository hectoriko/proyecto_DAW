/*
 * Configuración para la conexión a MongoDB Atlas.
 */

const user = process.env.ATLAS_USER;
const pass = process.env.ATLAS_PASS;
const bbdd = "sudokle";
const url  = `mongodb+srv://${user}:${pass}@cluster0.nrrxukw.mongodb.net/${bbdd}`;

/* Hacemos la uri de accesible a toda la aplicación */
module.exports = {
  url: url
};

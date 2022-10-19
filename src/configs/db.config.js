/* 
 * Configuración para la conexión a MongoDB Atlas.
 */
const user = "sudokle";
const pass = "IFPsudokle";
const bbdd = "sudokle";
const url = `mongodb+srv://${user}:${pass}@cluster0.nrrxukw.mongodb.net/${bbdd}`;

module.exports = {
    url: url
};

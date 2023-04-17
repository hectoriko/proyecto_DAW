/*
 * Primer punto de entrada. Aquí escuchamos peticiones y cargamos nuestros
 * middlewares y cargamos app.js que tendrá la lógica y las rutas.
 */

/* Cargamos el módulo dotenv para tener acceso a las variables de entorno */
require('dotenv').config();

/* Módulos */
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const app          = require('./app');



/* Escuchamos peticiones */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} <3`);
});

/* Utilizamos body-parser y cookie-parser para parsear métodos POST */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

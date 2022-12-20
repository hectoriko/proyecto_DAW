/*
 * Script para guardar nombre y constraseña de ATLAS. Una vez `prompt' tiene
 * los datos los guarda en variables en el archivo `.env'.
 */
const fs = require('fs');
const readline = require('readline');
const prompt = require('prompt');

/* Aseguramos que no exista ya el archivo .env */
if(fs.existsSync('.env')) {
    console.log("Ya existe un archivo .env, por favor eliminalo y ejecuta este script otra vez. O no, no soy tu madre, haz lo que quieras, que ya eres un adulto.");
    process.exit(1);
}

prompt.start();

/* Pedimos y guardmaos el nombre de usuario y contraseña */
prompt.get(['user', 'pass'], (err, res) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    createDotEnv(res.user, res.pass)
});

/* Creamos un archivo `.env' con la información. */
function createDotEnv(user, pass) {
    const cont = `ATLAS_USER="${user}"\nATLAS_PASS="${pass}"`;
    const stream = fs.createWriteStream('.env');
    stream.write(cont);
    stream.end();
}

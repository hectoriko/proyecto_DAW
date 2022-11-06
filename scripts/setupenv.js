const fs = require('fs');
const readline = require('readline');
const prompt = require('prompt');

if(fs.existsSync('.env')) {
    console.log("Ya existe un archivo .env, por favor eliminalo y ejecuta este script otra vez. O no, no soy tu madre, haz lo que quieras, que ya eres un adulto.");
    process.exit(1);
}

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//         const user = rl.question("Nombre de usuario para Atlas: ");
//         const pass = rl.question(`Contraseña de ${user}: `);
//         createDotEnv(user, pass);
//         rl.close();

// rl.on('close', () => process.exit(0));
prompt.start();

prompt.get(['user', 'pass'], (err, res) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    createDotEnv(res.user, res.pass)
});

function createDotEnv(user, pass) {
    const cont = `ATLAS_USER="${user}"\nATLAS_PASS="${pass}"`;
    const stream = fs.createWriteStream('.env');
    stream.write(cont);
    stream.end();
}

const fs = require('fs');
const readline = require('readline');

if(fs.existsSync('.env')) {
    console.log("Ya existe un archivo .env, por favor eliminalo y ejecuta este script otra vez. O no, no soy tu madre, haz lo que quieras, que ya eres un adulto.");
    process.exit(1);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

(async() => {
    try {
        const user = await prompt("Nombre de usuario para Atlas: ");
        const pass = await prompt(`Contraseña de ${user}: `);
        createDotEnv("this", "that");
        rl.close();
    } catch (err) {
        console.error("Unable to prompt", err)
    }
})();

rl.on('close', () => process.exit(0));

function createDotEnv(user, pass) {
    const cont = `ATLAS_USER="${user}"\nATLAS_PASS="${pass}"`
    const stream = fs.createWriteStream('.env');
    stream.write(cont);
    stream.end();
}

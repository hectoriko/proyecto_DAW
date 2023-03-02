```
 ________________________________________________________________________________ 
(  ______                               __              _____  _______ ________  )
( |   __ \.----.-----.--.--.-----.----.|  |_.-----.    |     \|   _   |  |  |  | )
( |    __/|   _|  _  |  |  |  -__|  __||   _|  _  |    |  --  |       |  |  |  | )
( |___|   |__| |_____|___  |_____|____||____|_____|____|_____/|___|___|________| )
(                    |_____|                     |______|                        )
 -------------------------------------------------------------------------------- 

```
###### Proyecto Daw -- Equipo 14

### Requisistos:

- npm
- git

### Instalación de entorno de desarrollo:

1. Clonamos el repositorio y entramos en la carpeta del proyecto:
   ```sh
   $ git clone https://github.com/hektoriko/proyecto_DAW
   $ cd proyecto_DAW
   ```
1. Instalamos las dependencias de desarrollo:
   ```sh
   $ npm install
   ```
1. Ejecutamos el script para meter nuestro usuario y contraseña de ATLAS
   ```sh
   $ npm run env
   ```
   Nos creara un archivo `.env` con los datos requeridos por la base de datos.

### Comandos:

- Instanciar el servidor localmente:
   ```sh
   $ npm start
   ```
- Popular la base de datos con puzles:

   ```sh
   $ npm run populatedb
   ```

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

- Instalar "npm": https://www.npmjs.com/
- Instalar "git": https://git-scm.com/
- Estar registrado en Github para poder ver y clonar el repositorio: https://github.com

### Instalación de entorno de desarrollo:

1. Creamos una carpeta donde se clonará el repositorio. Abrimos el terminal Git CMD y nos colocamos en el directorio creado. 
   
   ```sh
   $ cd /ruta/carpeta
   ```

   Clonamos el repositorio y entramos en la carpeta del proyecto:
   
   ```sh
   $ git clone https://github.com/hectoriko/proyecto_DAW
   $ cd proyecto_DAW
   ```
   
2. Instalamos las dependencias de desarrollo:
   
   ```sh
   $ npm install
   ```
   
3. Ejecutamos el script para meter nuestro usuario y contraseña de ATLAS. USER: Sudokle PASSWORD: IFPsudokle
   
   ```sh
   $ npm run env
   ```
   
   Nos creara un archivo `.env` con los datos requeridos por la base de datos.

### Comandos:

- Instanciar el servidor localmente. 

   ```sh
   $ npm start
   ```
   
- Abrir navegador e introducir la direccion:

   localhost:3000

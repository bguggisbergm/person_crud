const express = require('express'); // Importa el módulo de Express para crear el servidor web.
const mongoose = require('mongoose'); // Importa el módulo de Mongoose para interactuar con MongoDB.
const bodyParser = require('body-parser'); // Importa el módulo body-parser para parsear el cuerpo de las peticiones HTTP.
const personsRouter = require('./routes/persons'); // Importa las rutas definidas en el archivo persons.js.
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const app = express(); // Crea una instancia de la aplicación Express.
app.use(bodyParser.json()); // Usa body-parser para convertir el cuerpo de las peticiones en JSON.

// Mensaje de depuracion para saber si esta tomando correctamente el valor de la conexion a MongoDB Atlas
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Conexión a MongoDB Atlas usando la variable de entorno
mongoose.connect(process.env.MONGODB_URI, {
});

// Obtener la conexión a la base de datos.
const db = mongoose.connection;

// Enlaza un manejador de eventos para errores de conexión.
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));

// Este evento se activa una vez que la conexión se ha abierto correctamente.
db.once('open', () => {
    console.log('Conectado a MongoDB Atlas');
});

// Usa el enrutador para manejar todas las solicitudes que comiencen con '/persons'.
app.use('/persons', personsRouter);

// Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola.
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

// console.log('Hola mundo');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConection } = require('./config/database'); //no requiere la extension .js

//Crear el servidor express
const app = express();

// configurar CORS
app.use(cors());
// use es una funcion midleware que siempres se va a ejecutar siempre para todas las lineas
// que estan hacia abajo

//Lectura y parseo del body
app.use(express.json());



// conexion a base de datos
dbConection();
//console.log(process.env);


//rutas del API

app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/odontologo', require('./routes/odontologo.routes'));
app.use('/api/paciente', require('./routes/paciente.routes'));
app.use('/api/cita', require('./routes/cita.routes'));
app.use('/api/especialidad', require('./routes/especialidad.routes'));
app.use('/api/todo', require('./routes/busqueda.routes'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})
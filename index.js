/*
    index.js
    Author: German Valencia
    Actualización: German Valencia
*/
require('dotenv').config();
const path = require('path');
const express = require('express');
const sequelize = require('./database/connection');
const cors = require('cors');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Directorio público
app.use( express.static('public') );

/*
*   TODO
*/

// APLICACIONES
app.use('/api/aplicaciones', require('./routes/aplicaciones') );
app.use('/api/versiones-ap', require('./routes/versiones-ap') );
app.use('/api/paquetes', require('./routes/paquetes') );
app.use('/api/paquetes-aplicaciones', require('./routes/paquetes-aplicaciones') );
app.use('/api/modulos', require('./routes/modulos-ap') );
app.use('/api/suites', require('./routes/suites-ap') );
app.use('/api/usuarios-roles', require('./routes/usuarios-roles') );
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/roles', require('./routes/roles') );
app.use('/api/auth', require('./routes/auth') );
// CONEXIONES BD 
app.use('/api/conexiones-bd', require('./routes/conexiones-bd') );
// SUSCRIPTORES
app.use('/api/suscriptores', require('./routes/suscriptores') );
app.use('/api/empresas-sc', require('./routes/empresas-sc') );
app.use('/api/usuarios-sc', require('./routes/usuarios-sc') );
app.use('/api/usuarios-empresas', require('./routes/usuaios-empresas') );
app.use('/api/suscriptor-paquetes', require('./routes/suscriptor-paquetes') );
// TIVKETS
app.use('/api/tickets', require('./routes/tickets') );
app.use('/api/requerimientos-tk', require('./routes/requerimientos') );
app.use('/api/seguimientos-tk', require('./routes/seguimientos') );
// SITIOS
app.use('/api/sitios-ap', require('./routes/sitios-ap') );
app.use('/api/contenidos-el', require('./routes/contenidos-el') );
app.use('/api/enlaces-st', require('./routes/enlaces-st') );
// IDIOMAS
app.use('/api/idiomas', require('./routes/idiomas') );
app.use('/api/textos-id', require('./routes/textos-id') );
// LOGS
app.use('/api/logs-actividades', require('./routes/logs-actividades') );
app.use('/api/logs-actualizaciones', require('./routes/logs-actualizaciones') );
app.use('/api/logs-transacciones', require('./routes/logs-transacciones') );
// app.use('/api/pla-adjuntos', require('./routes/pla_adjuntos') );

app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});

sequelize.authenticate().then(() => {
    console.log('Conexión establecida con SQL Server.');
    return sequelize.sync(); // crea tabla si no existe
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Servidor escuchando en puerto ' + process.env.PORT);
    });
}).catch(err => {
    console.error('Error al conectar con la base de datos:', err);
});

// npx sequelize-cli model:generate --name User --attributes name:string,email:string
// npx sequelize-cli model:generate --name Post --attributes title:string,content:text,userId:integer

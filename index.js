/*
    index.js
    Author: German Valencia
    Actualización: German Valencia, John Castañeda,
    Actualización: Gerard Valencia, 20251101
*/
require('dotenv').config();
const path = require('path');
const express = require('express');
const sequelize = require('./database/connection');
const cors = require('cors');

const app = express();
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) ); 

app.use( cors() );
app.use( express.static('public') );

// PLATAFORMA
app.use('/api/usuarios-roles', require('./routes/usuarios-roles') );
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/roles', require('./routes/roles') );
app.use('/api/auth', require('./routes/auth') );
app.use('/api/upload', require('./routes/uploads') );
app.use('/api/sliders', require('./routes/sliders-inicio') );
app.use('/api/colores', require('./routes/colores-settings') );
app.use('/api/tipos-valor', require('./routes/tipos-valor') );
app.use('/api/valores-unitarios', require('./routes/valores-unitarios') );
app.use('/api/db-setup', require('./routes/db-setup') );
// APLICACIONES
app.use('/api/aplicaciones', require('./routes/aplicaciones') );
app.use('/api/versiones', require('./routes/versiones-ap') );
app.use('/api/paquetes', require('./routes/paquetes') );
app.use('/api/items-paquete', require('./routes/items-paquete') );
app.use('/api/modulos', require('./routes/modulos-ap') );
app.use('/api/suites', require('./routes/suites-ap') );
// CONEXIONES BD 
app.use('/api/conexiones-bd', require('./routes/conexiones-bd') );
app.use('/api/servidores', require('./routes/servidores') );
// SUSCRIPTORES
app.use('/api/suscriptores', require('./routes/suscriptores') );
app.use('/api/empresas-sc', require('./routes/empresas-sc') );
app.use('/api/usuarios-sc', require('./routes/usuarios-sc') );
app.use('/api/usuarios-empresas-sc', require('./routes/usuarios-empresas-sc') );
app.use('/api/paquetes-sc', require('./routes/paquetes-sc') );
// TICKETS
app.use('/api/tipos-estados', require('./routes/tipos-estados') );
app.use('/api/estados', require('./routes/estados') );
app.use('/api/tickets-ap', require('./routes/tickets-ap') );
app.use('/api/requerimientos-tk', require('./routes/requerimientos') );
app.use('/api/seguimientos-tk', require('./routes/seguimientos') );
app.use('/api/clases-ticket', require('./routes/clases-ticket') );
// SITIOS
app.use('/api/sitios-ap', require('./routes/sitios-ap') );
app.use('/api/contenidos-el', require('./routes/contenidos-el') );
app.use('/api/enlaces-st', require('./routes/enlaces-st') );
// IDIOMAS
app.use('/api/idiomas', require('./routes/idiomas') );
app.use('/api/textos-id', require('./routes/textos-id') );
// LOGS
app.use('/api/tios-logs', require('./routes/tipos-logs') );
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

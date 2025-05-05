/*
    index.js
    Author: German Valencia
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
*   PTLUsuariosEmpresas
*   PTLSuscriptorAplicaciones
*   PTLSuscriptorPaquetes

*   PTLIdiomas
*   PTLTectosID
*/

// Rutas
app.use('/api/aplicaciones', require('./routes/aplicaciones') );
app.use('/api/roles', require('./routes/roles') );
app.use('/api/versiones-ap', require('./routes/versiones-ap') );
app.use('/api/paquetes', require('./routes/paquetes') );
app.use('/api/paquetes-aplicaciones', require('./routes/paquetes-aplicaciones') );
app.use('/api/modulos', require('./routes/modulos-ap') );
app.use('/api/conexiones-bd', require('./routes/conexiones-bd') );
app.use('/api/usuarios-roles', require('./routes/usuarios-roles') );
// app.use('/api/usuarios-empresas', require('./routes/usuarios-empresas') );
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/suscriptores', require('./routes/suscriptores') );
// app.use('/api/suscriptor-aplicaciones', require('./routes/suscriptor-paquetes') );
app.use('/api/empresas-sc', require('./routes/empresas-sc') );
app.use('/api/usuarios-sc', require('./routes/usuarios-sc') );
// app.use('/api/suscriptor-paquetes', require('./routes/suscriptor-paquetes') );
app.use('/api/tickets', require('./routes/tickets') );
app.use('/api/requerimientos-tk', require('./routes/requerimientos') );
app.use('/api/seguimientos-tk', require('./routes/seguimientos') );

app.use('/api/logs-actividades', require('./routes/logs-actividades') );
app.use('/api/logs-actualizaciones', require('./routes/logs-actualizaciones') );
app.use('/api/logs-transacciones', require('./routes/logs-transacciones') );
// app.use('/api/pla-adjuntos', require('./routes/pla_adjuntos') );

app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});

sequelize.authenticate()
  .then(() => {
    console.log(`Conectado a la BD ${process.env.DB_NAME}`);
    app.listen(process.env.PORT, () => console.log(`Servidor corriendo en http://${process.env.DB_SERVER}:${process.env.PORT}`));
  })
  .catch(err => console.error('Error al conectar a la BD:', err));


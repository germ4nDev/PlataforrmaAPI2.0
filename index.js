/*
    index.js
    Author: German Valencia
    Actualización: John Castañeda
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
*   PTLUsuariosEmpresasSC
*   PTLSuscriptorAplicaciones
*   PTLSuscriptorPaquetes

*   PTLIdiomas
*   PTLTextosID
*   PTLPaquetesSC
*/

// Rutas
app.use('/api/aplicaciones', require('./routes/aplicaciones') );
app.use('/api/conexiones-bd', require('./routes/conexiones-bd') );
app.use('/api/contenidos-el', require('./routes/contenidos-el') );
app.use('/api/empresas-sc', require('./routes/empresas-sc') );
app.use('/api/enlaces-st', require('./routes/enlaces-st') );

app.use('/api/logs-actividades-ap', require('./routes/logs-actividades-ap') );
app.use('/api/logs-actualizaciones-ap', require('./routes/logs-actualizaciones-ap') );
app.use('/api/logs-transacciones-ap', require('./routes/logs-transacciones-ap') );
app.use('/api/modulos-ap', require('./routes/modulos-ap') );
app.use('/api/paquetes-aplicaciones', require('./routes/paquetes-aplicaciones') );

app.use('/api/paquetes', require('./routes/paquetes') );
app.use('/api/requerimientos-tk', require('./routes/requerimientos-tk') );
app.use('/api/roles-ap', require('./routes/roles-ap') );
app.use('/api/seguimientos-rq', require('./routes/seguimientos-rq') );
app.use('/api/sitios-ap', require('./routes/sitios-ap') );
// app.use('/api/suscriptor-paquetes', require('./routes/suscriptor-paquetes') );
app.use('/api/suscriptores', require('./routes/suscriptores') );

app.use('/api/tickets-ap', require('./routes/tickets-ap') );
// app.use('/api/usuarios-empresas', require('./routes/usuarios-empresas') );
app.use('/api/usuarios-roles', require('./routes/usuarios-roles') );
app.use('/api/usuarios-sc', require('./routes/usuarios-sc') );
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/versiones-ap', require('./routes/versiones-ap') );
// app.use('/api/suscriptor-aplicaciones', require('./routes/suscriptor-paquetes') );

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


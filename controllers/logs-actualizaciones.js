// /*
//     Author: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLLogsActualizacionesAP = require('../models/log-actualizacion')(sequelize);
// const { io } = require('../index');

// // Obtener todos los roles
// const getLogsActualizaciones = async (req, res) => {
//   try {
//     const logs = await PTLLogsActualizacionesAP.findAll();
//     return res.status(201).json({
//       ok: true,
//       logs: logs,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener UsuariosRoles' });
//   }
// };

// const getLogActualizacionById = async (req, res) => {
//   try {
//     const { logId } = req.body;
//     const log = await PTLLogsActualizacionesAP.findById(logId);
//     if (!log) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un log por el id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       log: log,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener el log' });
//   }
// };

// // Crear un nuevo rol
// const createLogActualizacion = async (req, res = response) => {
//     const { ...newRegistro } = req.body;
//   try {
//     const nuevo = await PTLLogsActualizacionesAP.create(newRegistro);
//     io.emit('log-actualizaciones-actualizados', {
//       action: 'create',
//       msg: `Log Actualización creado: ${nuevo.codigoUsuarioCreacion}`
//     });
//     return res.status(201).json({
//       ok: true,
//       log: nuevo
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al crear el log' });
//   }
// };

// module.exports = {
//   getLogsActualizaciones,
//   getLogActualizacionById,
//   createLogActualizacion,
// };

/*
    Author: German Valencia
*/
const { response } = require('express');
const logActualizacionesService = require('../services/log-actualizaciones.service'); // Ajusta la ruta a tu proyecto

const getLogsActualizaciones = async (req, res = response) => {
  try {
    const logs = await logActualizacionesService.obtenerLogsActualizaciones();

    return res.status(200).json({ // Cambiado a 200
      ok: true,
      logs: logs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los logs de actualizaciones' }); // Corregido: decía 'UsuariosRoles'
  }
};

const getLogActualizacionById = async (req, res = response) => {
  try {
    // Tomamos el ID de la URL (req.params.id) y no del body
    const log = await logActualizacionesService.obtenerLogActualizacionPorId(req.params.id);

    return res.status(200).json({ // Cambiado a 200
      ok: true,
      log: log,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: 'Error al obtener el log' });
  }
};

const createLogActualizacion = async (req, res = response) => {
  try {
    const nuevoLog = await logActualizacionesService.crearLogActualizacion(req.body);

    return res.status(201).json({
      ok: true,
      log: nuevoLog
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el log de actualización' });
  }
};

module.exports = {
  getLogsActualizaciones,
  getLogActualizacionById,
  createLogActualizacion,
};
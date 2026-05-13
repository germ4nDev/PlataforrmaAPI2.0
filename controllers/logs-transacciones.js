// /*
//     Author: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLLogsTransaccionesAP = require('../models/log-transaccion')(sequelize);
// const { io } = require('../index');

// // Obtener todos los roles
// const getLogsTransacciones = async (req, res) => {
//   try {
//     const logs = await PTLLogsTransaccionesAP.findAll();
//     return res.status(201).json({
//       ok: true,
//       logs: logs,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener UsuariosRoles' });
//   }
// };

// const getLogTransaccionById = async (req, res) => {
//   try {
//     const { logId } = req.body;
//     const log = await PTLLogsTransaccionesAP.findById(logId);
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
// const createLogTransaccion = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const nuevo = await PTLLogsTransaccionesAP.create(newRegistro);
//     io.emit('log-transacciones-actualizados', {
//       action: 'create',
//       msg: `Log Transacción creado: ${nuevo.codigoUsuarioCreacion}`
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
//   getLogsTransacciones,
//   getLogTransaccionById,
//   createLogTransaccion,
// };

/*
    Author: German Valencia
*/
const { response } = require('express');
const logTransaccionesService = require('../services/log-transacciones.service'); // Ajusta la ruta a tu proyecto

const getLogsTransacciones = async (req, res = response) => {
  try {
    const logs = await logTransaccionesService.obtenerLogsTransacciones();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      logs: logs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los logs de transacciones' }); // Corregido: decía UsuariosRoles
  }
};

const getLogTransaccionById = async (req, res = response) => {
  try {
    // Extraemos el ID de los parámetros de la URL y no del body
    const log = await logTransaccionesService.obtenerLogTransaccionPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
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

const createLogTransaccion = async (req, res = response) => {
  try {
    const nuevoLog = await logTransaccionesService.crearLogTransaccion(req.body);

    return res.status(201).json({
      ok: true,
      log: nuevoLog
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el log' });
  }
};

module.exports = {
  getLogsTransacciones,
  getLogTransaccionById,
  createLogTransaccion,
};
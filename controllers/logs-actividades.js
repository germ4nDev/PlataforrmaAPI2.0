// /*
//     Author: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLLogActividadesAP = require('../models/log-actividad')(sequelize);
// const { io } = require('../index');

// // Obtener todos los roles
// const geLogsActividades = async (req, res) => {
//   try {
//     const logs = await PTLLogActividadesAP.findAll();
//     return res.status(201).json({
//       ok: true,
//       logs: logs,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener UsuariosRoles' });
//   }
// };

// const geLogActividadById = async (req, res) => {
//   try {
//     const { logId } = req.body;
//     const log = await PTLLogActividadesAP.findById(logId);
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

// const createLogActividad = async (req, res = response) => {
//     const { ...newRegistro } = req.body;
//   try {
//     console.log('cuerpo del log', newRegistro);
//     const nuevo = await PTLLogActividadesAP.create(newRegistro);
//     io.emit('log-actividades-actualizados', {
//       action: 'create',
//       msg: `Log Actividad creado: ${nuevo.codigoUsuarioCreacion}`
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
//   geLogsActividades,
//   geLogActividadById,
//   createLogActividad,
// };

/*
    Author: German Valencia
*/
const { response } = require('express');
const logActividadesService = require('../services/log-actividades.service'); // Ajusta la ruta a tu proyecto

const getLogsActividades = async (req, res = response) => {
  try {
    const logs = await logActividadesService.obtenerLogsActividades();

    return res.status(200).json({
      ok: true,
      logs: logs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los logs' });
  }
};

const getLogActividadById = async (req, res = response) => {
  try {
    const log = await logActividadesService.obtenerLogActividadPorId(req.params.id);

    return res.status(200).json({
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

const createLogActividad = async (req, res = response) => {
  try {
    console.log('cuerpo del log', req.body);
    const nuevoLog = await logActividadesService.crearLogActividad(req.body);

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
  getLogsActividades,
  getLogActividadById,
  createLogActividad,
};
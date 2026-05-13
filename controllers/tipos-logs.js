// /*
//     Author: John Castañeda
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLTiposLogs = require('../models/tipo-log')(sequelize);
// const { io } = require('../index');

// const getTiposLogs = async (req, res) => {
//   try {
//     const tipos = await PTLTiposLogs.findAll();
//     return res.status(201).json({
//       ok: true,
//       tiposLogs: tipos,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener los tiposLogs ' + err });
//   }
// };

// const getTipoLogById = async (req, res) => {
//   try {
//     const codigoTipoLog = req.params.id;
//     const tipoLog = await PTLTiposLogs.findOne({
//       where: {
//         codigoTipoLog: codigoTipoLog,
//       },
//     });
//     if (!tipoLog) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un tiposLogs por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       tipoLog: tipoLog,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener tiposLogs" });
//   }
// };

// const createTipoLog = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const tipoLogDB = await PTLTiposLogs.create(newRegistro);
//     io.emit('tipos-estadps-actualizados', {
//       action: 'create',
//       msg: `TipoLog creado: ${tipoEstadoDB.nombreTipo}`
//     });
//     return res.status(201).json({
//       ok: true,
//       tipoLog: tipoLogDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear el tiposLogs'
//     });
//   }
// };

// const updateTipoLog = async (req, res = response) => {
//   const { codigoTipoLog, ...data } = req.body;
//   try {
//     const tipoLogDB = await PTLTiposLogs.findOne({
//       where: { codigoTipoLog }
//     });
//     if (!tipoLogDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un tiposLogs con ese ID'
//       });
//     }
//     await PTLTiposLogs.update(data, {
//       where: { codigoTipoLog }
//     });
//     const tipoLogActualizado = await PTLTiposLogs.findOne({ where: { codigoTipoLog } });
//     io.emit('tipos-estadps-actualizados', {
//       action: 'update',
//       msg: `TipoLog creado: ${tipoLogActualizado.nombreTipo}`
//     });
//     return res.status(200).json({
//       ok: true,
//       tipoLog: tipoLogActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el tiposLogs'
//     });
//   }
// };

// const deleteTipoLog = async (req, res = response) => {
//   try {
//     const codigoTipoLog = req.params.id;
//     const tipoLogDB = await PTLTiposLogs.findOne({
//       where: { codigoTipoLog }
//     });
//     if (!tipoLogDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un tiposLogs con ese ID'
//       });
//     }
//     tipoLogEliminado = await PTLTiposLogs.destroy({
//       where: { codigoTipoLog }
//     });
//     io.emit('tipos-estadps-actualizados', {
//       action: 'delete',
//       msg: `TipoLog eliminado: ${tipoLogEliminado.nombreTipo}`
//     });
//     return res.status(200).json({
//       ok: true,
//       tipoLog: tipoLogEliminado,
//       msg: 'TipoLog eliminado correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el tiposLogs'
//     });
//   }
// };

// module.exports = {
//   getTiposLogs,
//   getTipoLogById,
//   createTipoLog,
//   updateTipoLog,
//   deleteTipoLog,
// };

/*
    Author: John Castañeda
*/
const { response } = require('express');
const tiposLogsService = require('../services/tipos-logs.service'); // Ajusta la ruta a tu proyecto

const getTiposLogs = async (req, res = response) => {
  try {
    const tipos = await tiposLogsService.obtenerTiposLogs();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tiposLogs: tipos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los tipos de logs' }); // Concatenación de error eliminada para evitar crasheos si err es objeto
  }
};

const getTipoLogById = async (req, res = response) => {
  try {
    const tipoLog = await tiposLogsService.obtenerTipoLogPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tipoLog: tipoLog,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener el tipo de log" });
  }
};

const createTipoLog = async (req, res = response) => {
  try {
    const tipoLogDB = await tiposLogsService.crearTipoLog(req.body);

    return res.status(201).json({
      ok: true,
      tipoLog: tipoLogDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el tipo de log'
    });
  }
};

const updateTipoLog = async (req, res = response) => {
  try {
    const { codigoTipoLog, ...data } = req.body;

    const tipoLogActualizado = await tiposLogsService.actualizarTipoLog(codigoTipoLog, data);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tipoLog: tipoLogActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el tipo de log'
    });
  }
};

const deleteTipoLog = async (req, res = response) => {
  try {
    const tipoLogEliminado = await tiposLogsService.eliminarTipoLog(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tipoLog: tipoLogEliminado,
      msg: 'TipoLog eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el tipo de log'
    });
  }
};

module.exports = {
  getTiposLogs,
  getTipoLogById,
  createTipoLog,
  updateTipoLog,
  deleteTipoLog,
};
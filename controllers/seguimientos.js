// /*
//     Author: German Valencia
//     Actualización: John Castañeda
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLSeguimientosTK = require('../models/seguimiento')(sequelize);
// const { io } = require('../index');

// const getSeguimientosTK = async (req, res) => {
//   try {
//     const seguimientos = await PTLSeguimientosTK.findAll();
//     return res.status(201).json({
//       ok: true,
//       seguimientos: seguimientos,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener SeguimientosTK' });
//   }
// };

// const getSeguimientoTKById = async (req, res) => {
//   try {
//     const codigoSeguimiento = req.params.id;
//     const seguimiento = await PTLSeguimientosTK.findOne({
//       where: {
//         codigoSeguimiento: codigoSeguimiento,
//       },
//     });
//     if (!seguimiento) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un seguimiento por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       seguimiento: seguimiento,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener seguimiento" });
//   }
// };

// const getSeguimientoTKByTicket = async (req, res) => {
//   try {
//     const codigoTicket = req.params.id;
//     const seguimientos = await PTLSeguimientosTK.findAll({
//       where: {
//         codigoTicket: codigoTicket,
//       },
//     });
//     return res.status(201).json({
//       ok: true,
//       seguimientos: seguimientos,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener seguimiento" });
//   }
// };

// // Crear un nuevo seguimiento
// const createSeguimientoTK = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const seguimientoDB = await PTLSeguimientosTK.create(newRegistro);
//     io.emit('seguijmientos-tk-actualizados', {
//       action: 'create',
//       msg: `Seguimiento creado: ${seguimientoDB.codigoSeguimiento}`
//     });
//     return res.status(201).json({
//       ok: true,
//       seguimiento: seguimientoDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear el seguimiento'
//     });
//   }
// };

// // Actualizar un nuevo seguimiento
// const updateSeguimientoTK = async (req, res = response) => {
//   const { codigoSeguimiento, ...data } = req.body;
//   try {
//     const seguimientoDB = await PTLSeguimientosTK.findOne({
//       where: { codigoSeguimiento }
//     });
//     if (!seguimientoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un seguimiento con ese ID'
//       });
//     }
//     await PTLSeguimientosTK.update(data, {
//       where: { codigoSeguimiento }
//     });
//     const seguimientoActualizado = await PTLSeguimientosTK.findOne({ where: { codigoSeguimiento } });
//     io.emit('seguijmientos-tk-actualizados', {
//       action: 'update',
//       msg: `Seguimiento actualizado: ${seguimientoActualizado.codigoSeguimiento}`
//     });
//     return res.status(200).json({
//       ok: true,
//       seguimiento: seguimientoActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el seguimiento'
//     });
//   }
// };

// // Borrar un nuevo seguimiento
// const deleteSeguimientoTK = async (req, res = response) => {
//   try {
//     const codigoSeguimiento = req.params.id;
//     const seguimientoDB = await PTLSeguimientosTK.findOne({
//       where: { codigoSeguimiento }
//     });
//     if (!seguimientoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un seguimiento con ese ID'
//       });
//     }
//     seguimientoEliminado = await PTLSeguimientosTK.destroy({
//       where: { codigoSeguimiento }
//     });
//     io.emit('seguijmientos-tk-actualizados', {
//       action: 'delete',
//       msg: `Seguimiento eliminado: ${seguimientoDB.codigoSeguimiento}`
//     });
//     return res.status(200).json({
//       ok: true,
//       seguimiento: seguimientoEliminado,
//       msg: 'seguimiento eliminado correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el seguimiento'
//     });
//   }
// };

// module.exports = {
//   getSeguimientosTK,
//   getSeguimientoTKById,
//   getSeguimientoTKByTicket,
//   createSeguimientoTK,
//   updateSeguimientoTK,
//   deleteSeguimientoTK,
// };

/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { response } = require('express');
const seguimientosTkService = require('../services/seguimientos-tk.service'); // Ajusta la ruta a tu proyecto

const getSeguimientosTK = async (req, res = response) => {
  try {
    const seguimientos = await seguimientosTkService.obtenerSeguimientos();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      seguimientos: seguimientos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener SeguimientosTK' });
  }
};

const getSeguimientoTKById = async (req, res = response) => {
  try {
    const seguimiento = await seguimientosTkService.obtenerSeguimientoPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      seguimiento: seguimiento,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener seguimiento" });
  }
};

const getSeguimientoTKByTicket = async (req, res = response) => {
  try {
    const seguimientos = await seguimientosTkService.obtenerSeguimientosPorTicket(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      seguimientos: seguimientos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener seguimientos por ticket" });
  }
};

const createSeguimientoTK = async (req, res = response) => {
  try {
    const seguimientoDB = await seguimientosTkService.crearSeguimiento(req.body);

    return res.status(201).json({
      ok: true,
      seguimiento: seguimientoDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el seguimiento'
    });
  }
};

const updateSeguimientoTK = async (req, res = response) => {
  try {
    const { codigoSeguimiento, ...data } = req.body;

    const seguimientoActualizado = await seguimientosTkService.actualizarSeguimiento(codigoSeguimiento, data);

    return res.status(200).json({
      ok: true,
      seguimiento: seguimientoActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el seguimiento'
    });
  }
};

const deleteSeguimientoTK = async (req, res = response) => {
  try {
    const seguimientoEliminado = await seguimientosTkService.eliminarSeguimiento(req.params.id);

    return res.status(200).json({
      ok: true,
      seguimiento: seguimientoEliminado,
      msg: 'Seguimiento eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el seguimiento'
    });
  }
};

module.exports = {
  getSeguimientosTK,
  getSeguimientoTKById,
  getSeguimientoTKByTicket,
  createSeguimientoTK,
  updateSeguimientoTK,
  deleteSeguimientoTK,
};
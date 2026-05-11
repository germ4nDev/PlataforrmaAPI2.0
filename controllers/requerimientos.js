// /*
//     Author: German Valencia
//     Actualización: John Castañeda
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLRequerimientosTK = require('../models/requerimiento')(sequelize);
// const { io } = require('../index');

// const getRequerimientosTK = async (req, res) => {
//   try {
//     const requerimientos = await PTLRequerimientosTK.findAll();
//     return res.status(201).json({
//       ok: true,
//       requerimientos: requerimientos,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener requerimientos' });
//   }
// };

// const getRequerimientoTKById = async (req, res) => {
//   try {
//     const codigoRequerimiento = req.params.id;
//     const requerimiento = await PTLRequerimientosTK.findOne({
//       where: {
//         codigoRequerimiento: codigoRequerimiento,
//       },
//     });
//     if (!requerimiento) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un requerimiento por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       requerimiento: requerimiento,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener requerimiento" });
//   }
// };

// const createRequerimientoTK = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const requerimientoDB = await PTLRequerimientosTK.create(newRegistro);
//     io.emit('requerimientos-actualizados', {
//       action: 'create',
//       msg: `Requerimineto creado: ${requerimientoDB.nombreRequerimiento}`
//     });
//     return res.status(201).json({
//       ok: true,
//       requerimiento: requerimientoDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear el requerimiento'
//     });
//   }
// };

// const updateRequerimientoTK = async (req, res = response) => {
//   const { codigoRequerimiento, ...data } = req.body;
//   try {
//     const requerimientoDB = await PTLRequerimientosTK.findOne({
//       where: { codigoRequerimiento }
//     });
//     if (!requerimientoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un requerimiento con ese ID'
//       });
//     }
//     await PTLRequerimientosTK.update(data, {
//       where: { codigoRequerimiento }
//     });
//     const requerimientoActualizado = await PTLRequerimientosTK.findOne({ where: { codigoRequerimiento } });
//     io.emit('requerimientos-actualizados', {
//       action: 'update',
//       msg: `Requerimineto actualizado: ${requerimientoActualizado.nombreRequerimiento}`
//     });
//     return res.status(200).json({
//       ok: true,
//       requerimiento: requerimientoActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el requerimiento'
//     });
//   }
// };

// const deleteRequerimientoTK = async (req, res = response) => {
//   try {
//     const codigoRequerimiento = req.params.id;
//     const requerimientoDB = await PTLRequerimientosTK.findOne({
//       where: { codigoRequerimiento }
//     });
//     if (!requerimientoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un requerimiento con ese ID'
//       });
//     }
//     requerimientoEliminado = await PTLRequerimientosTK.destroy({
//       where: { codigoRequerimiento }
//     });
//     io.emit('requerimientos-actualizados', {
//       action: 'delete',
//       msg: `Requerimineto eliminado: ${requerimientoDB.nombreRequerimiento}`
//     });
//     return res.status(200).json({
//       ok: true,
//       requerimiento: requerimientoEliminado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el requerimiento'
//     });
//   }
// };

// module.exports = {
//   getRequerimientosTK,
//   getRequerimientoTKById,
//   createRequerimientoTK,
//   updateRequerimientoTK,
//   deleteRequerimientoTK,
// };

/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { response } = require('express');
const requerimientosTkService = require('../services/requerimientos-tk.service'); // Ajusta la ruta a tu proyecto

const getRequerimientosTK = async (req, res = response) => {
  try {
    const requerimientos = await requerimientosTkService.obtenerRequerimientos();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      requerimientos: requerimientos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener requerimientos' });
  }
};

const getRequerimientoTKById = async (req, res = response) => {
  try {
    const requerimiento = await requerimientosTkService.obtenerRequerimientoPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      requerimiento: requerimiento,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener requerimiento" });
  }
};

const createRequerimientoTK = async (req, res = response) => {
  try {
    const requerimientoDB = await requerimientosTkService.crearRequerimiento(req.body);

    return res.status(201).json({
      ok: true,
      requerimiento: requerimientoDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el requerimiento'
    });
  }
};

const updateRequerimientoTK = async (req, res = response) => {
  try {
    const { codigoRequerimiento, ...data } = req.body;

    const requerimientoActualizado = await requerimientosTkService.actualizarRequerimiento(codigoRequerimiento, data);

    return res.status(200).json({
      ok: true,
      requerimiento: requerimientoActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el requerimiento'
    });
  }
};

const deleteRequerimientoTK = async (req, res = response) => {
  try {
    const requerimientoEliminado = await requerimientosTkService.eliminarRequerimiento(req.params.id);

    return res.status(200).json({
      ok: true,
      requerimiento: requerimientoEliminado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el requerimiento'
    });
  }
};

module.exports = {
  getRequerimientosTK,
  getRequerimientoTKById,
  createRequerimientoTK,
  updateRequerimientoTK,
  deleteRequerimientoTK,
};
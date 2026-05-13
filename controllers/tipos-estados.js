// /*
//     Author: John Castañeda
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLTiposEstados = require('../models/tipo-estado')(sequelize);
// const { io } = require('../index');

// // Obtener todos los tiposEstados
// const getTiposEstados = async (req, res) => {
//   try {
//     const tiposEstados = await PTLTiposEstados.findAll();
//     return res.status(201).json({
//       ok: true,
//       tiposEstados: tiposEstados,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener los tiposEstados' });
//   }
// };

// const getTiposEstadosById = async (req, res) => {
//   try {
//     const tipoEstadoId = req.params.id;
//     const tipoEstado = await PTLTiposEstados.findOne({
//       where: {
//         tipoEstadoId: tipoEstadoId,
//       },
//     });
//     if (!tipoEstado) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un tipoEstado por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       tipoEstado: tipoEstado,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener tipoEstado" });
//   }
// };

// // Crear un nuevo tipoEstado
// const createTipoEstado = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const tipoEstadoDB = await PTLTiposEstados.create(newRegistro);
//     io.emit('tipos-estadps-actualizados', {
//       action: 'create',
//       msg: `TipoEstado creado: ${tipoEstadoDB.nombreTipo}`
//     });
//     return res.status(201).json({
//       ok: true,
//       tipoEstado: tipoEstadoDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear el tipoEstado'
//     });
//   }
// };

// // Actualizar un nuevo tipoEstado
// const updateTipoEstado = async (req, res = response) => {
//   const { tipoEstadoId, ...data } = req.body;
//   try {
//     const tipoEstadoDB = await PTLTiposEstados.findOne({
//       where: { tipoEstadoId }
//     });
//     if (!tipoEstadoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un tipoEstado con ese ID'
//       });
//     }
//     await PTLTiposEstados.update(data, {
//       where: { tipoEstadoId }
//     });
//     const tipoEstadoActualizado = await PTLTiposEstados.findOne({ where: { tipoEstadoId } });
//     io.emit('tipos-estadps-actualizados', {
//       action: 'update',
//       msg: `TipoEstado actualizado: ${tipoEstadoActualizado.nombreTipo}`
//     });
//     return res.status(200).json({
//       ok: true,
//       tipoEstado: tipoEstadoActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el tipoEstado'
//     });
//   }
// };

// // Borrar un nuevo tipoEstado
// const deleteTipoEstado = async (req, res = response) => {
//   try {
//     const tipoEstadoId = req.params.id;
//     const tipoEstadoDB = await PTLTiposEstados.findOne({
//       where: { tipoEstadoId }
//     });
//     if (!tipoEstadoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un tipoEstado con ese ID'
//       });
//     }
//     tipoEstadoEliminado = await PTLTiposEstados.destroy({
//       where: { tipoEstadoId }
//     });
//     io.emit('tipos-estadps-actualizados', {
//       action: 'delete',
//       msg: `TipoEstado eliminado: ${tipoEstadoDB.nombreTipo}`
//     });
//     return res.status(200).json({
//       ok: true,
//       usuario: tipoEstadoEliminado,
//       msg: 'tipoEstado eliminado correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el tipoEstado'
//     });
//   }
// };

// module.exports = {
//   getTiposEstados,
//   getTiposEstadosById,
//   createTipoEstado,
//   updateTipoEstado,
//   deleteTipoEstado,
// };

/*
    Author: John Castañeda
*/
const { response } = require('express');
const tiposEstadosService = require('../services/tipos-estados.service'); // Ajusta la ruta a tu proyecto

const getTiposEstados = async (req, res = response) => {
  try {
    const tiposEstados = await tiposEstadosService.obtenerTiposEstados();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tiposEstados: tiposEstados,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los tiposEstados' });
  }
};

const getTiposEstadosById = async (req, res = response) => {
  try {
    const tipoEstado = await tiposEstadosService.obtenerTipoEstadoPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tipoEstado: tipoEstado,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener tipoEstado" });
  }
};

const createTipoEstado = async (req, res = response) => {
  try {
    const tipoEstadoDB = await tiposEstadosService.crearTipoEstado(req.body);

    return res.status(201).json({
      ok: true,
      tipoEstado: tipoEstadoDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el tipoEstado'
    });
  }
};

const updateTipoEstado = async (req, res = response) => {
  try {
    const { tipoEstadoId, ...data } = req.body;

    const tipoEstadoActualizado = await tiposEstadosService.actualizarTipoEstado(tipoEstadoId, data);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tipoEstado: tipoEstadoActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el tipoEstado'
    });
  }
};

const deleteTipoEstado = async (req, res = response) => {
  try {
    const tipoEstadoEliminado = await tiposEstadosService.eliminarTipoEstado(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tipoEstado: tipoEstadoEliminado, // Corregido: antes decía 'usuario'
      msg: 'TipoEstado eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el tipoEstado'
    });
  }
};

module.exports = {
  getTiposEstados,
  getTiposEstadosById,
  createTipoEstado,
  updateTipoEstado,
  deleteTipoEstado,
};
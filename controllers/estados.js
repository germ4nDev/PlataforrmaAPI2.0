// /*
//     Author: John Castañeda
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLEstados = require('../models/estado')(sequelize);
// const { io } = require('../index');

// // Obtener todos los estados
// const getEstados = async (req, res) => {
//   try {
//     const estados = await PTLEstados.findAll();
//     return res.status(201).json({
//       ok: true,
//       estados: estados,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener los estados' });
//   }
// };

// const getEstadosById = async (req, res) => {
//   try {
//     const estadoId = req.params.id;
//     const estado = await PTLEstados.findOne({
//       where: {
//         estadoId: estadoId,
//       },
//     });
//     if (!estado) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un estado por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       estado: estado,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener estado" });
//   }
// };

// // Crear un nuevo estado
// const createEstado = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const estadoDB = await PTLEstados.create(newRegistro);
//     io.emit('estados-actualizadas', {
//       action: 'create',
//       msg: `Estado creado: ${estadoDB.nombreEstado}`
//     });
//     return res.status(201).json({
//       ok: true,
//       estado: estadoDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear el estado'
//     });
//   }
// };

// // Actualizar un nuevo estado
// const updateEstado = async (req, res = response) => {
//   try {
//     const { estadoId, ...data } = req.body;
//     const estadoDB = await PTLEstados.findOne({
//       where: { estadoId }
//     });
//     if (!estadoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un estado con ese ID'
//       });
//     }
//     await PTLEstados.update(data, {
//       where: { estadoId }
//     });
//     const estadoActualizado = await PTLEstados.findOne({ where: { estadoId } });
//     io.emit('estados-actualizadas', {
//       action: 'update',
//       msg: `Estado actualizado: ${estadoActualizado.nombreEstado}`
//     });
//     return res.status(200).json({
//       ok: true,
//       estado: estadoActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el estado'
//     });
//   }
// };

// // Borrar un nuevo estado
// const deleteEstado = async (req, res = response) => {
//   try {
//     const estadoId = req.params.id;
//     const estadoDB = await PTLEstados.findOne({
//       where: { estadoId }
//     });
//     if (!estadoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un estado con ese ID'
//       });
//     }
//     estadoEliminado = await PTLEstados.destroy({
//       where: { estadoId }
//     });
//     io.emit('estados-actualizadas', {
//       action: 'delete',
//       msg: `Estado eliminadp: ${estadoDB.nombreEstado}`
//     });
//     return res.status(200).json({
//       ok: true,
//       usuario: estadoEliminado,
//       msg: 'estado eliminado correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el estado'
//     });
//   }
// };

// module.exports = {
//   getEstados,
//   getEstadosById,
//   createEstado,
//   updateEstado,
//   deleteEstado,
// };

/*
    Author: John Castañeda
*/
const { response } = require('express');
const estadosService = require('../services/estados.service'); // Ajusta la ruta a tu proyecto

const getEstados = async (req, res = response) => {
  try {
    const estados = await estadosService.obtenerEstados();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      estados: estados,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los estados' });
  }
};

const getEstadosById = async (req, res = response) => {
  try {
    const estado = await estadosService.obtenerEstadoPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      estado: estado,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener estado" });
  }
};

const createEstado = async (req, res = response) => {
  try {
    const estadoDB = await estadosService.crearEstado(req.body);

    return res.status(201).json({
      ok: true,
      estado: estadoDB
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el estado'
    });
  }
};

const updateEstado = async (req, res = response) => {
  try {
    const { estadoId, ...data } = req.body;

    const estadoActualizado = await estadosService.actualizarEstado(estadoId, data);

    return res.status(200).json({
      ok: true,
      estado: estadoActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el estado'
    });
  }
};

const deleteEstado = async (req, res = response) => {
  try {
    const estadoEliminado = await estadosService.eliminarEstado(req.params.id);

    return res.status(200).json({
      ok: true,
      estado: estadoEliminado, // Corregido: antes enviaba 'usuario: estadoEliminado'
      msg: 'Estado eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el estado'
    });
  }
};

module.exports = {
  getEstados,
  getEstadosById,
  createEstado,
  updateEstado,
  deleteEstado,
};
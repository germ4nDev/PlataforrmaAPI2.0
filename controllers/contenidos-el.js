// /*
//     Author: John Castañeda
//     Actualizado: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLContenidosEL = require('../models/contenido-el')(sequelize);
// const { io } = require('../index');

// const getContenidos = async (req, res) => {
//   try {
//     const contenidos = await PTLContenidosEL.findAll();
//     return res.status(201).json({
//       ok: true,
//       contenidos: contenidos,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener en Contenido' });
//   }
// };

// const getContenidoById = async (req, res) => {
//   try {
//     const codigoContenido = req.params.id;
//     const contenido = await PTLContenidosEL.findOne({
//       where: {
//         codigoContenido: codigoContenido,
//       },
//     });
//     if (!contenido) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un contenido por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       contenido: contenido,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener el contenido" });
//   }
// };

// const createContenido = async (req, res = response) => {
//   try {
//     const { ...newRegistro } = req.body;
//     const existeNombre = await PTLContenidosEL.findOne({
//       where: { nombreContenido: newRegistro.nombreContenido }
//     });
//     if (existeNombre) {
//       return res.status(400).json({
//         ok: false,
//         msg: 'Ya existe un contenido con ese nombre'
//       });
//     }
//     const contenidoDB = await PTLContenidosEL.create(newRegistro);
//     io.emit('contenidos-actualizadas', {
//       action: 'create',
//       msg: `Conternido creada: ${contenidoDB.nombreContenido}`
//     });
//     return res.status(201).json({
//       ok: true,
//       contenido: contenidoDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear el contenido'
//     });
//   }
// };

// const updateContenido = async (req, res = response) => {
//   try {
//     const { codigoContenido, ...data } = req.body;
//     const contenidoDB = await PTLContenidosEL.findOne({
//       where: { codigoContenido }
//     });
//     if (!contenidoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un contenido con ese ID'
//       });
//     }
//     await PTLContenidosEL.update(data, {
//       where: { codigoContenido }
//     });
//     const contenidoActualizado = await PTLContenidosEL.findOne({ where: { codigoContenido } });
//     io.emit('contenidos-actualizadas', {
//       action: 'update',
//       msg: `Conternido actualizado: ${contenidoActualizado.nombreContenido}`
//     });
//     return res.status(200).json({
//       ok: true,
//       contenido: contenidoActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el contenido'
//     });
//   }
// };

// const deleteContenido = async (req, res = response) => {
//   try {
//     const codigoContenido = req.params.id;
//     const contenidoDB = await PTLContenidosEL.findOne({
//       where: { codigoContenido }
//     });
//     if (!contenidoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un sitio con ese ID'
//       });
//     }
//     contenidoEliminado = await PTLContenidosEL.destroy({
//       where: { codigoContenido }
//     });
//     io.emit('contenidos-actualizadas', {
//       action: 'delete',
//       msg: `Conternido eliminado correctamente`
//     });
//     return res.status(200).json({
//       ok: true,
//       contenido: contenidoEliminado,
//       msg: 'Contenido eliminado correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el contenido'
//     });
//   }
// };

// module.exports = {
//   getContenidos,
//   getContenidoById,
//   createContenido,
//   updateContenido,
//   deleteContenido,
// };

/*
    Author: John Castañeda
    Actualizado: German Valencia
*/
const { response } = require('express');
const contenidosElService = require('../services/contenidos-el.service'); // Ajusta la ruta a tu proyecto

const getContenidos = async (req, res = response) => {
  try {
    const contenidos = await contenidosElService.obtenerContenidos();

    return res.status(200).json({
      ok: true,
      contenidos: contenidos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener en Contenido' });
  }
};

const getContenidoById = async (req, res = response) => {
  try {
    const contenido = await contenidosElService.obtenerContenidoPorId(req.params.id);

    return res.status(200).json({
      ok: true,
      contenido: contenido,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener el contenido" });
  }
};

const createContenido = async (req, res = response) => {
  try {
    const contenidoDB = await contenidosElService.crearContenido(req.body);

    return res.status(201).json({
      ok: true,
      contenido: contenidoDB
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el contenido'
    });
  }
};

const updateContenido = async (req, res = response) => {
  try {
    const { codigoContenido, ...data } = req.body;

    const contenidoActualizado = await contenidosElService.actualizarContenido(codigoContenido, data);

    return res.status(200).json({
      ok: true,
      contenido: contenidoActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el contenido'
    });
  }
};

const deleteContenido = async (req, res = response) => {
  try {
    const contenidoEliminado = await contenidosElService.eliminarContenido(req.params.id);

    return res.status(200).json({
      ok: true,
      contenido: contenidoEliminado,
      msg: 'Contenido eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el contenido'
    });
  }
};

module.exports = {
  getContenidos,
  getContenidoById,
  createContenido,
  updateContenido,
  deleteContenido,
};
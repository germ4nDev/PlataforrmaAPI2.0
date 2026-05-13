// /*
//     Author: German Valencia
//     Actualización: John Castañeda
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLConexionesBD = require('../models/conexion-bd')(sequelize);
// const { io } = require('../index');

// const getConexionesBD = async (req, res) => {
//   try {
//     const conexiones = await PTLConexionesBD.findAll();
//     return res.status(201).json({
//       ok: true,
//       conexiones: conexiones,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener la ConexionBD' });
//   }
// };

// const getConexionById = async (req, res) => {
//   try {
//     const codigoConexion = req.params.id;
//     const conexion = await PTLConexionesBD.findOne({
//       where: {
//         codigoConexion: codigoConexion,
//       },
//     });
//     if (!conexion) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe una conexion por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       conexion: conexion,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener la conexion" });
//   }
// };

// const createConexion = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const conexionDB = await PTLConexionesBD.create(newRegistro);
//     io.emit('conexiones=db-actualizadas', {
//       action: 'create',
//       msg: `Conexión BD creada: ${conexionDB.nombreConexion}`
//     });
//     return res.status(201).json({
//       ok: true,
//       conexion: conexionDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear la conexion'
//     });
//   }
// };

// const updateConexion = async (req, res = response) => {
//   try {
//     const { codigoConexion, ...data } = req.body;
//     const conexionDB = await PTLConexionesBD.findOne({
//       where: { codigoConexion }
//     });
//     if (!conexionDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe una conexion con ese ID'
//       });
//     }
//     await PTLConexionesBD.update(data, {
//       where: { codigoConexion }
//     });
//     const conexionActualizado = await PTLConexionesBD.findOne({ where: { codigoConexion } });
//     io.emit('conexiones=db-actualizadas', {
//       action: 'update',
//       msg: `Conexión BD actualizado: ${conexionActualizado.nombreConexion}`
//     });
//     return res.status(200).json({
//       ok: true,
//       conexion: conexionActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar la conexion'
//     });
//   }
// };

// const deleteConexion = async (req, res = response) => {
//   try {
//     const codigoConexion = req.params.id;
//     const conexionDB = await PTLConexionesBD.findOne({
//       where: { codigoConexion }
//     });
//     if (!conexionDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un conexion con ese ID'
//       });
//     }
//     conexionEliminado = await PTLConexionesBD.destroy({
//       where: { codigoConexion }
//     });
//     io.emit('conexiones=db-actualizadas', {
//       action: 'delete',
//       msg: `Conexión BD eliminada correctamente`
//     });
//     return res.status(200).json({
//       ok: true,
//       usuario: conexionEliminado,
//       msg: 'la conexion se elimino correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar la conexion'
//     });
//   }
// };

// module.exports = {
//   getConexionesBD,
//   getConexionById,
//   createConexion,
//   updateConexion,
//   deleteConexion,
// };

/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { response } = require('express');
const conexionesBdService = require('../services/conexiones-bd.service'); // Ajusta la ruta a tu proyecto

const getConexionesBD = async (req, res = response) => {
  try {
    const conexiones = await conexionesBdService.obtenerConexiones();

    return res.status(200).json({
      ok: true,
      conexiones: conexiones,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la ConexionBD' });
  }
};

const getConexionById = async (req, res = response) => {
  try {
    const conexion = await conexionesBdService.obtenerConexionPorId(req.params.id);

    return res.status(200).json({
      ok: true,
      conexion: conexion,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener la conexion" });
  }
};

const createConexion = async (req, res = response) => {
  try {
    const conexionDB = await conexionesBdService.crearConexion(req.body);

    return res.status(201).json({
      ok: true,
      conexion: conexionDB
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al crear la conexion'
    });
  }
};

const updateConexion = async (req, res = response) => {
  try {
    const { codigoConexion, ...data } = req.body;

    const conexionActualizada = await conexionesBdService.actualizarConexion(codigoConexion, data);

    return res.status(200).json({
      ok: true,
      conexion: conexionActualizada
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar la conexion'
    });
  }
};

const deleteConexion = async (req, res = response) => {
  try {
    const conexionEliminada = await conexionesBdService.eliminarConexion(req.params.id);

    return res.status(200).json({
      ok: true,
      conexion: conexionEliminada, // Corregido: antes decía usuario: conexionEliminado
      msg: 'La conexion se elimino correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar la conexion'
    });
  }
};

module.exports = {
  getConexionesBD,
  getConexionById,
  createConexion,
  updateConexion,
  deleteConexion,
};
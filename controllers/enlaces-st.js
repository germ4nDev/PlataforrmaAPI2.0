// /*
//     Author: John Castañeda
//     Actualizado: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLEnlacesST = require('../models/enlace-st')(sequelize);
// const { io } = require('../index');

// const getEnlaces = async (req, res) => {
//   try {
//     const enlaces = await PTLEnlacesST.findAll();
//     return res.status(201).json({
//       ok: true,
//       enlaces: enlaces,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener en enlace' });
//   }
// };

// const getEnlaceById = async (req, res) => {
//   try {
//     const codigoEnlace = req.params.id;
//     const enlace = await PTLEnlacesST.findOne({
//       where: {
//         codigoEnlace: codigoEnlace,
//       },
//     });
//     if (!enlace) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un enlace por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       enlace: enlace,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener el enlace" });
//   }
// };

// const createEnlace = async (req, res = response) => {
//     const { ...newRegistro } = req.body;
//   try {
//     const existeNombre = await PTLEnlacesST.findOne({
//       where: { nombreEnlace: newRegistro.nombreEnlace }
//     });
//     if (existeNombre) {
//       return res.status(400).json({
//         ok: false,
//         msg: 'Ya existe un enlace con ese nombre'
//       });
//     }
//     const enlaceDB = await PTLEnlacesST.create(newRegistro);
//     io.emit('enlaces-st-actualizadas', {
//       action: 'create',
//       msg: `Enlace ST creado: ${enlaceDB.nombreEnlace}`
//     });
//     return res.status(201).json({
//       ok: true,
//       enlace: enlaceDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear el enlace'
//     });
//   }
// };

// const updateEnlace = async (req, res = response) => {
//     const { codigoEnlace, ...data } = req.body;
//   try {
//     const enlaceDB = await PTLEnlacesST.findOne({
//       where: { codigoEnlace }
//     });
//     if (!enlaceDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un enlace con ese ID'
//       });
//     }
//     await PTLEnlacesST.update(data, {
//       where: { codigoEnlace }
//     });
//     const enlaceActualizado = await PTLEnlacesST.findOne({ where: { codigoEnlace } });
//     io.emit('enlaces-st-actualizadas', {
//       action: 'update',
//       msg: `Enlace ST actualizado: ${enlaceActualizado.nombreEnlace}`
//     });
//     return res.status(200).json({
//       ok: true,
//       enlace: enlaceActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el enlace'
//     });
//   }
// };

// const deleteEnlace = async (req, res = response) => {
//   try {
//     const codigoEnlace = req.params.id;
//     const enlaceDB = await PTLEnlacesST.findOne({
//       where: { codigoEnlace }
//     });
//     if (!enlaceDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un sitio con ese ID'
//       });
//     }
//     enlaceEliminado = await PTLEnlacesST.destroy({
//       where: { codigoEnlace }
//     });
//     io.emit('enlaces-st-actualizadas', {
//       action: 'delete',
//       msg: `Enlace ST eliminado: ${enlaceDB.nombreEnlace}`
//     });
//     return res.status(200).json({
//       ok: true,
//       enlace: enlaceEliminado,
//       msg: 'Enlace eliminado correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el enlace'
//     });
//   }
// };

// module.exports = {
//     getEnlaces,
//     getEnlaceById,
//     createEnlace,
//     updateEnlace,
//     deleteEnlace,
// };
/*
    Author: John Castañeda
    Actualizado: German Valencia
*/
const { response } = require('express');
const enlacesStService = require('../services/enlaces-st.service'); // Ajusta la ruta a tu proyecto

const getEnlaces = async (req, res = response) => {
  try {
    const enlaces = await enlacesStService.obtenerEnlaces();

    return res.status(200).json({
      ok: true,
      enlaces: enlaces,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener en enlace' });
  }
};

const getEnlaceById = async (req, res = response) => {
  try {
    const enlace = await enlacesStService.obtenerEnlacePorId(req.params.id);

    return res.status(200).json({
      ok: true,
      enlace: enlace,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener el enlace" });
  }
};

const createEnlace = async (req, res = response) => {
  try {
    const enlaceDB = await enlacesStService.crearEnlace(req.body);

    return res.status(201).json({
      ok: true,
      enlace: enlaceDB
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el enlace'
    });
  }
};

const updateEnlace = async (req, res = response) => {
  try {
    const { codigoEnlace, ...data } = req.body;

    const enlaceActualizado = await enlacesStService.actualizarEnlace(codigoEnlace, data);

    return res.status(200).json({
      ok: true,
      enlace: enlaceActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el enlace'
    });
  }
};

const deleteEnlace = async (req, res = response) => {
  try {
    const enlaceEliminado = await enlacesStService.eliminarEnlace(req.params.id);

    return res.status(200).json({
      ok: true,
      enlace: enlaceEliminado,
      msg: 'Enlace eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el enlace'
    });
  }
};

module.exports = {
  getEnlaces,
  getEnlaceById,
  createEnlace,
  updateEnlace,
  deleteEnlace,
};
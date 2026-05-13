// /*
//     Author: German Valencia
//     Actualizado: German Valiencia 20251026
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLVersionesAP = require('../models/version-ap')(sequelize);
// const { io } = require('../index');

// const getVersionesAP = async (req, res) => {
//   try {
//     const versiones = await PTLVersionesAP.findAll();
//     return res.status(201).json({
//       ok: true,
//       versiones: versiones,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener versionesA{' });
//   }
// };

// const getVersionesAPById = async (req, res) => {
//   try {
//     const codigoVersion = req.params.id;
//     const version = await PTLVersionesAP.findOne({
//       where: { codigoVersion },
//     });
//     if (!version) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un versionAP por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       version: version,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener versionAP' });
//   }
// };

// const createVersionAP = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const nuevo = await PTLVersionesAP.create(newRegistro);
//     io.emit("versiones-actualizados", {
//       action: "create",
//       msg: `Version creado: ${nuevo.nombreVersion}`,
//     });
//     return res.status(201).json({
//       ok: true,
//       version: nuevo,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al crear ;a VersionAP' });
//   }
// };

// const updateVersionAP = async (req, res = response) => {
//   const { codigoVersion, ...data } = req.body;
//   try {
//     const version = await PTLVersionesAP.findOne({
//       where: { codigoVersion },
//     });
//     if (!version) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un versionAP por ese id",
//       });
//     }
//     const newVersion = {
//       codigoVersion: codigoVersion,
//       codigoAplicacion: data.codigoAplicacion,
//       fechaVersion: data.fechaVersion,
//       nombreVersion: data.nombreVersion,
//       version: data.version,
//       descripcionVersion: data.descripcionVersion,
//       estadoVersion: data.estadoVersion,
//       codigoUsuarioCreacion: data.codigoUsuarioCreacion,
//       fechaCreacion: data.fechaCreacion,
//       codigoUsuarioModificacion: data.codigoUsuarioModificacion,
//       fechaModificacion: data.fechaModificacion
//     }
//     console.log('data de la version', newVersion);
//     await PTLVersionesAP.update(newVersion, {
//       where: { codigoVersion }
//     });
//     const versionAPActualizado = await PTLVersionesAP.findOne({ where: { codigoVersion } });
//     io.emit("versiones-actualizados", {
//       action: "update",
//       msg: `Version actulozada: ${versionAPActualizado.nombreVersion}`,
//     });
//     return res.status(201).json({
//       ok: true,
//       version: versionAPActualizado,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al actualizar la versionAP' });
//   }
// };

// const deleteVersionAP = async (req, res = response) => {
//   try {
//     const codigoVersion = req.params.id;
//     const version = await PTLVersionesAP.findOne({
//       where: { codigoVersion },
//     });
//     if (!version) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un versionesId por ese id",
//       });
//     }
//     const versionAPEliminado = await PTLVersionesAP.destroy({
//       where: { codigoVersion }
//     });
//     io.emit("versiones-actualizados", {
//       action: "delete",
//       msg: `Version eliminada: ${versionAPEliminado.nombreVersion}`,
//     });
//     return res.status(201).json({
//       ok: true,
//       version: versionAPEliminado,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al eliminar usuario versionAP' });
//   }
// };

// module.exports = {
//   getVersionesAP,
//   getVersionesAPById,
//   createVersionAP,
//   updateVersionAP,
//   deleteVersionAP,
// };

/*
    Author: German Valencia
    Actualizado: German Valencia 20251026
*/
const { response } = require('express'); // Importación agregada
const versionesApService = require('../services/versiones-ap.service'); // Ajusta la ruta a tu proyecto

const getVersionesAP = async (req, res = response) => {
  try {
    const versiones = await versionesApService.obtenerVersionesAP();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      versiones: versiones,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener versionesAP' }); // Corregido typo 'versionesA{'
  }
};

const getVersionesAPById = async (req, res = response) => {
  try {
    const version = await versionesApService.obtenerVersionAPPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      version: version,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: 'Error al obtener versionAP' });
  }
};

const createVersionAP = async (req, res = response) => {
  try {
    const nuevaVersion = await versionesApService.crearVersionAP(req.body);

    return res.status(201).json({
      ok: true,
      version: nuevaVersion,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la versionAP' }); // Corregido typo ';a'
  }
};

const updateVersionAP = async (req, res = response) => {
  try {
    const { codigoVersion, ...data } = req.body;

    const versionActualizada = await versionesApService.actualizarVersionAP(codigoVersion, data);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      version: versionActualizada,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: 'Error al actualizar la versionAP' });
  }
};

const deleteVersionAP = async (req, res = response) => {
  try {
    const versionEliminada = await versionesApService.eliminarVersionAP(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      version: versionEliminada,
      msg: 'Versión eliminada correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: 'Error al eliminar la versionAP' }); // Corregido mensaje fantasma 'usuario versionAP'
  }
};

module.exports = {
  getVersionesAP,
  getVersionesAPById,
  createVersionAP,
  updateVersionAP,
  deleteVersionAP,
};
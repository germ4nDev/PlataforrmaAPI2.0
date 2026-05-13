// /*
//     Author: German Valencia
//     Actualización: John Castañeda
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLPaquetesSC = require('../models/paquete-sc')(sequelize);
// const { io } = require('../index');

// // Obtener todos los roles
// const getPaquetesSC = async (req, res) => {
//   try {
//     const suscritorPaquetes = await PTLPaquetesSC.findAll();
//     return res.status(201).json({
//       ok: true,
//       suscritorPaquetes: suscritorPaquetes,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener los pasuscritorPuetes' });
//   }
// };

// const getPaquetesSCById = async (req, res) => {
//   try {
//     const suscriptorPaqueteId = req.params.id;
//     const suscriptorPaquete = await PTLPaquetesSC.findOne({
//       where: {
//         suscriptorPaqueteId: suscriptorPaqueteId,
//       },
//     });
//     if (!suscriptorPaquete) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un suscriptorPaquete por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       suscriptorPaquete: suscriptorPaquete,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener suscriptorPaquete" });
//   }
// };

// // Crear un nuevo rol
// const createPaqueteSC = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const paqueteSCDB = await PTLPaquetesSC.create(newRegistro);
//     io.emit('paquetes-sc-actualizados', {
//       action: 'create',
//       msg: `Paquete SC creado: ${paqueteSCDB.suscriptoPaqueteId}`
//     });
//     return res.status(201).json({
//       ok: true,
//       suscriptorPaquete: paqueteSCDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear el suscriptorPaquete'
//     });
//   }
// };

// // Actualizar un nuevo rol
// const updatePaqueteSC = async (req, res = response) => {
//   try {
//     const { suscriptorPaqueteId, ...data } = req.body;
//     const paqueteSCDB = await PTLPaquetesSC.findOne({
//       where: { suscriptorPaqueteId }
//     });
//     if (!paqueteSCDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un suscrptorPaquete con ese ID'
//       });
//     }
//     await PTLPaquetesSC.update(data, {
//       where: { suscriptorPaqueteId }
//     });
//     const suscrptorPaqueteActualizado = await PTLPaquetesSC.findOne({ where: { suscriptorPaqueteId } });
//     io.emit('paquetes-sc-actualizados', {
//       action: 'update',
//       msg: `Paquete SC acturalizados: ${suscrptorPaqueteActualizado.suscriptoPaqueteId}`
//     });
//     return res.status(200).json({
//       ok: true,
//       suscrptorPaquete: suscrptorPaqueteActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el suscrptorPaquete'
//     });
//   }
// };

// // Borrar un nuevo rol
// const deletePaqueteSC = async (req, res = response) => {
//   try {
//     const suscriptorPaqueteId = req.params.id;
//     const paqueteSCDB = await PTLPaquetesSC.findOne({
//       where: { suscriptorPaqueteId }
//     });
//     if (!paqueteSCDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un suscriptorPaquete con ese ID'
//       });
//     }
//     suscriptorPaqueteEliminado = await PTLPaquetesSC.destroy({
//       where: { suscriptorPaqueteId }
//     });
//     io.emit('paquetes-sc-actualizados', {
//       action: 'delete',
//       msg: `Paquete SC eliminado: ${suscriptorPaqueteEliminado.suscriptoPaqueteId}`
//     });
//     return res.status(200).json({
//       ok: true,
//       usuario: suscriptorPaqueteEliminado,
//       msg: 'suscriptorPaquete eliminado correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el suscriptorPaquete'
//     });
//   }
// };

// module.exports = {
//   getPaquetesSC,
//   getPaquetesSCById,
//   createPaqueteSC,
//   updatePaqueteSC,
//   deletePaqueteSC,
// };

/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { response } = require('express');
const paquetesScService = require('../services/paquetes-sc.service'); // Ajusta la ruta a tu proyecto

const getPaquetesSC = async (req, res = response) => {
  try {
    const suscriptoresPaquetes = await paquetesScService.obtenerPaquetesSC();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      suscriptoresPaquetes: suscriptoresPaquetes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los suscriptoresPaquetes' }); // Corregido el mensaje de error
  }
};

const getPaquetesSCById = async (req, res = response) => {
  try {
    const suscriptorPaquete = await paquetesScService.obtenerPaqueteSCPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      suscriptorPaquete: suscriptorPaquete,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener suscriptorPaquete" });
  }
};

const createPaqueteSC = async (req, res = response) => {
  try {
    const paqueteSCDB = await paquetesScService.crearPaqueteSC(req.body);

    return res.status(201).json({
      ok: true,
      suscriptorPaquete: paqueteSCDB
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el suscriptorPaquete'
    });
  }
};

const updatePaqueteSC = async (req, res = response) => {
  try {
    const { suscriptorPaqueteId, ...data } = req.body;

    const suscriptorPaqueteActualizado = await paquetesScService.actualizarPaqueteSC(suscriptorPaqueteId, data);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      suscriptorPaquete: suscriptorPaqueteActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el suscriptorPaquete'
    });
  }
};

const deletePaqueteSC = async (req, res = response) => {
  try {
    const suscriptorPaqueteEliminado = await paquetesScService.eliminarPaqueteSC(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      suscriptorPaquete: suscriptorPaqueteEliminado, // Corregido: decía 'usuario'
      msg: 'SuscriptorPaquete eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el suscriptorPaquete'
    });
  }
};

module.exports = {
  getPaquetesSC,
  getPaquetesSCById,
  createPaqueteSC,
  updatePaqueteSC,
  deletePaqueteSC,
};
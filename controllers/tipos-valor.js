// /*
//     Author: John Castañeda
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLTiposValor = require('../models/tipo-valor')(sequelize);
// const { io } = require('../index');

// const getTiposValor = async (req, res) => {
//   try {
//     const tipos = await PTLTiposValor.findAll();
//     return res.status(201).json({
//       ok: true,
//       tiposValor: tipos,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener los tiposValor ' + err });
//   }
// };

// const getTiposValorById = async (req, res) => {
//   try {
//     const tipoValorId = req.params.id;
//     const tipoValor = await PTLTiposValor.findOne({
//       where: {
//         tipoValorId: tipoValorId,
//       },
//     });
//     if (!tipoValor) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un tipoValor por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       tipoValor: tipoValor,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener tipoValor" });
//   }
// };

// // Crear un nuevo tipoValor
// const createTkipoValor = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const tipoValorDB = await PTLTiposValor.create(newRegistro);
//     io.emit('tipos-valores-actualizados', {
//       action: 'create',
//       msg: `TipoValor creado: ${tipoValorDB.nombreTipo}`
//     });
//     return res.status(201).json({
//       ok: true,
//       tipoValor: tipoValorDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear el tipoValor'
//     });
//   }
// };

// // Actualizar un nuevo tipoValor
// const updateTkipoValor = async (req, res = response) => {
//   const { tipoValorId, ...data } = req.body;
//   try {
//     const tipoValorDB = await PTLTiposValor.findOne({
//       where: { tipoValorId }
//     });
//     if (!tipoValorDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un tipoValor con ese ID'
//       });
//     }
//     await PTLTiposValor.update(data, {
//       where: { tipoValorId }
//     });
//     const tipoValorActualizado = await PTLTiposValor.findOne({ where: { tipoValorId } });
//     io.emit('tipos-valores-actualizados', {
//       action: 'update',
//       msg: `TipoValor actualizado: ${tipoValorActualizado.nombreTipo}`
//     });
//     return res.status(200).json({
//       ok: true,
//       tipoValor: tipoValorActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el tipoValor'
//     });
//   }
// };

// // Borrar un nuevo tipoValor
// const deleteTkipoValor = async (req, res = response) => {
//   try {
//     const tipoValorId = req.params.id;
//     const tipoValorDB = await PTLTiposValor.findOne({
//       where: { tipoValorId }
//     });
//     if (!tipoValorDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un tipoValor con ese ID'
//       });
//     }
//     tipoValorEliminado = await PTLTiposValor.destroy({
//       where: { tipoValorId }
//     });
//     io.emit('tipos-valores-actualizados', {
//       action: 'delete',
//       msg: `TipoValor eliminado: ${tipoValorDB.nombreTipo}`
//     });
//     return res.status(200).json({
//       ok: true,
//       usuario: tipoValorEliminado,
//       msg: 'tipoValor eliminado correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el tipoValor'
//     });
//   }
// };

// module.exports = {
//   getTiposValor,
//   getTiposValorById,
//   createTkipoValor,
//   updateTkipoValor,
//   deleteTkipoValor,
// };

/*
    Author: John Castañeda
*/
const { response } = require('express');
const tiposValorService = require('../services/tipos-valor.service'); // Ajusta la ruta a tu proyecto

const getTiposValor = async (req, res = response) => {
  try {
    const tipos = await tiposValorService.obtenerTiposValor();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tiposValor: tipos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los tiposValor' }); // Corregida la concatenación del error
  }
};

const getTiposValorById = async (req, res = response) => {
  try {
    const tipoValor = await tiposValorService.obtenerTipoValorPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tipoValor: tipoValor,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener tipoValor" });
  }
};

const createTipoValor = async (req, res = response) => { // Nombre corregido
  try {
    const tipoValorDB = await tiposValorService.crearTipoValor(req.body);

    return res.status(201).json({
      ok: true,
      tipoValor: tipoValorDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el tipoValor'
    });
  }
};

const updateTipoValor = async (req, res = response) => { // Nombre corregido
  try {
    const { tipoValorId, ...data } = req.body;

    const tipoValorActualizado = await tiposValorService.actualizarTipoValor(tipoValorId, data);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tipoValor: tipoValorActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el tipoValor'
    });
  }
};

const deleteTipoValor = async (req, res = response) => { // Nombre corregido
  try {
    const tipoValorEliminado = await tiposValorService.eliminarTipoValor(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      tipoValor: tipoValorEliminado, // Corregido: antes decía 'usuario'
      msg: 'tipoValor eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el tipoValor'
    });
  }
};

module.exports = {
  getTiposValor,
  getTiposValorById,
  createTipoValor, // Nombre corregido
  updateTipoValor, // Nombre corregido
  deleteTipoValor, // Nombre corregido
};
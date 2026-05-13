// /*
//     Author: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLTextosID = require('../models/texto-id')(sequelize);
// const { io } = require('../index');

// // Obtener todos los textoIDes
// const getTextosID = async (req, res) => {
//   try {
//     const testosID = await PTLTextosID.findAll();
//     return res.status(201).json({
//       ok: true,
//       textosId: testosID,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener TextosID' });
//   }
// };

// const getTextosIDById = async (req, res) => {
//   const { textoId } = req.body;
//   try {
//     const textoID = await PTLTextosID.findById(textoId);
//     if (!textoID) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un textoID con ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       textoID: textoID,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener el textoID' });
//   }
// };

// // Crear un nuevo textoID
// const createTextoID = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const nuevo = await PTLTextosID.create(newRegistro);
//     io.emit('textos-actualizados', {
//       action: 'create',
//       msg: `Texto creado: ${nuevo.anclaTexto}`
//     });
//     return res.status(201).json({
//       ok: true,
//       texto: textoDB
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al crear el textoID' });
//   }
// };

// // Actualizar un nuevo textoID
// const updateTextoID = async (req, res = response) => {
//   const { textoId, ...data } = req.body;
//   try {
//     const textoDB = await PTLTextosID.findOne({
//       where: { textoId }
//     });
//     if (!textoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un texto con ese ID'
//       });
//     }
//     await PTLTextosID.update(data, {
//       where: { textoId }
//     });
//     const textoActualizado = await PTLTextosID.findOne({ where: { textoId } });
//     io.emit('textos-actualizados', {
//       action: 'update',
//       msg: `Texto actualizado: ${textoActualizado.anclaTexto}`
//     });
//     return res.status(200).json({
//       ok: true,
//       texto: textoActualizado
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al actualizar el textoID' });
//   }
// };

// // Borrar un nuevo textoID
// const deleteTextoID = async (req, res = response) => {
//   try {
//     const textoId = req.params.id;
//     const textoDB = await PTLTextosID.findOne({
//       where: { textoId }
//     });
//     if (!textoDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un texto con ese ID'
//       });
//     }
//     textoEliminado = await PTLTextosID.destroy({
//       where: { textoId }
//     });
//     io.emit('textos-actualizados', {
//       action: 'delete',
//       msg: `Tecto eliminado correctamente`
//     });
//     return res.status(200).json({
//       ok: true,
//       texto: textoEliminado,
//       msg: 'Tecto eliminado correctamente'
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al eliminar textoID' });
//   }
// };

// module.exports = {
//   getTextosID,
//   getTextosIDById,
//   createTextoID,
//   updateTextoID,
//   deleteTextoID,
// };

/*
    Author: German Valencia
*/
const { response } = require('express');
const textosIdService = require('../services/textos-id.service'); // Ajusta la ruta a tu proyecto

const getTextosID = async (req, res = response) => {
  try {
    const textos = await textosIdService.obtenerTextos();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      textosId: textos, // Corregido typo 'testosID'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener TextosID' });
  }
};

const getTextosIDById = async (req, res = response) => {
  try {
    // Tomamos el ID de los parámetros de la URL, no del body
    const textoID = await textosIdService.obtenerTextoPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      textoID: textoID,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: 'Error al obtener el textoID' });
  }
};

const createTextoID = async (req, res = response) => {
  try {
    const nuevoTexto = await textosIdService.crearTexto(req.body);

    return res.status(201).json({
      ok: true,
      texto: nuevoTexto // Corregido el bug de la variable 'textoDB' que no existía
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el textoID' });
  }
};

const updateTextoID = async (req, res = response) => {
  try {
    const { textoId, ...data } = req.body;

    const textoActualizado = await textosIdService.actualizarTexto(textoId, data);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      texto: textoActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: 'Error al actualizar el textoID' });
  }
};

const deleteTextoID = async (req, res = response) => {
  try {
    const textoEliminado = await textosIdService.eliminarTexto(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      texto: textoEliminado,
      msg: 'Texto eliminado correctamente' // Corregido el typo "Tecto"
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: 'Error al eliminar textoID' });
  }
};

module.exports = {
  getTextosID,
  getTextosIDById,
  createTextoID,
  updateTextoID,
  deleteTextoID,
};
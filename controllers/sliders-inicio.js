// /*
//     Author: German Valencia
//     Actualización: John Castañeda
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLSliderInicio = require('../models/slider')(sequelize);
// const { io } = require('../index');

// const getSlidersInicio = async (req, res) => {
//   try {
//     const slidersInicio = await PTLSliderInicio.findAll();
//     return res.status(201).json({
//       ok: true,
//       slidersInicio: slidersInicio,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener la SlidersInicio' });
//   }
// };

// const getSliderInicioById = async (req, res) => {
//   try {
//     const sliderId = req.params.id;
//     const sliderInicio = await PTLSliderInicio.findOne({
//       where: {
//         sliderId: sliderId,
//       },
//     });
//     if (!sliderInicio) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe una sliderInicio por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       sliderInicio: sliderInicio,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener la sliderInicio" });
//   }
// };

// // Crear un nuevo rol
// const createSliderInicio = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const sliderInicioDB = await PTLSliderInicio.create(newRegistro);
//     io.emit('sliders-actualizados', {
//       action: 'create',
//       msg: `Sllider creado: ${sliderInicioDB.nombreSlider}`
//     });
//     return res.status(201).json({
//       ok: true,
//       sliderInicio: sliderInicioDB
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al crear la sliderInicio'
//     });
//   }
// };

// // Actualizar un nuevo rol
// const updateSliderInicio = async (req, res = response) => {
//   const { sliderId, ...data } = req.body;
//   try {
//     const sliderInicioDB = await PTLSliderInicio.findOne({
//       where: { sliderId }
//     });
//     if (!sliderInicioDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe una sliderInicio con ese ID'
//       });
//     }
//     await PTLSliderInicio.update(data, {
//       where: { sliderId }
//     });
//     const sliderInicioActualizado = await PTLSliderInicio.findOne({ where: { sliderId } });
//     io.emit('sliders-actualizados', {
//       action: 'update',
//       msg: `Sllider actualizado: ${sliderInicioActualizado.nombreSlider}`
//     });
//     return res.status(200).json({
//       ok: true,
//       sliderInicio: sliderInicioActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar la sliderInicio'
//     });
//   }
// };

// // Borrar un nuevo rol
// const deleteSliderInicio = async (req, res = response) => {
//   try {
//     const sliderId = req.params.id;
//     const sliderInicioDB = await PTLSliderInicio.findOne({
//       where: { sliderId }
//     });
//     if (!sliderInicioDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un sliderInicio con ese ID'
//       });
//     }
//     sliderInicioEliminado = await PTLSliderInicio.destroy({
//       where: { sliderId }
//     });
//     io.emit('sliders-actualizados', {
//       action: 'delete',
//       msg: `Sllider eliminado: ${sliderInicioEliminado.nombreSlider}`
//     });
//     return res.status(200).json({
//       ok: true,
//       sliderInicio: sliderInicioEliminado,
//       msg: 'la sliderInicio se elimino correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar la sliderInicio'
//     });
//   }
// };

// module.exports = {
//   getSlidersInicio,
//   getSliderInicioById,
//   createSliderInicio,
//   updateSliderInicio,
//   deleteSliderInicio,
// };

/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { response } = require('express');
const slidersInicioService = require('../services/sliders-inicio.service'); // Ajusta la ruta a tu proyecto

const getSlidersInicio = async (req, res = response) => {
  try {
    const slidersInicio = await slidersInicioService.obtenerSlidersInicio();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      slidersInicio: slidersInicio,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la SlidersInicio' });
  }
};

const getSliderInicioById = async (req, res = response) => {
  try {
    const sliderInicio = await slidersInicioService.obtenerSliderInicioPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      sliderInicio: sliderInicio,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener la sliderInicio" });
  }
};

const createSliderInicio = async (req, res = response) => {
  try {
    const sliderInicioDB = await slidersInicioService.crearSliderInicio(req.body);

    return res.status(201).json({
      ok: true,
      sliderInicio: sliderInicioDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear la sliderInicio'
    });
  }
};

const updateSliderInicio = async (req, res = response) => {
  try {
    const { sliderId, ...data } = req.body;

    const sliderInicioActualizado = await slidersInicioService.actualizarSliderInicio(sliderId, data);

    return res.status(200).json({
      ok: true,
      sliderInicio: sliderInicioActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar la sliderInicio'
    });
  }
};

const deleteSliderInicio = async (req, res = response) => {
  try {
    const sliderInicioEliminado = await slidersInicioService.eliminarSliderInicio(req.params.id);

    return res.status(200).json({
      ok: true,
      sliderInicio: sliderInicioEliminado,
      msg: 'El sliderInicio se eliminó correctamente' // Corregido texto descriptivo
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar la sliderInicio'
    });
  }
};

module.exports = {
  getSlidersInicio,
  getSliderInicioById,
  createSliderInicio,
  updateSliderInicio,
  deleteSliderInicio,
};
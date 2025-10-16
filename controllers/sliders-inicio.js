/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSliderInicio = require('../models/slider')(sequelize);

// Obtener todos los roles
const getSlidersInicio = async (req, res) => {
  try {
    const slidersInicio = await PTLSliderInicio.findAll();
    return res.status(201).json({
      ok: true,
      slidersInicio: slidersInicio,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la SlidersInicio' });
  }
};

const getSliderInicioById = async (req, res) => {
  try {
    const sliderId = req.params.id;
    const sliderInicio = await PTLSliderInicio.findOne({
      where: {
        sliderId: sliderId,
      },
    });
    if (!sliderInicio) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una sliderInicio por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      sliderInicio: sliderInicio,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la sliderInicio" });
  }
};

// Crear un nuevo rol
const createSliderInicio = async (req, res = response) => {
  try {
    const nuevaSliderInicio = req.body;
    const sliderInicioDB = await PTLSliderInicio.create(nuevaSliderInicio);
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

// Actualizar un nuevo rol
const updateSliderInicio = async (req, res = response) => {
  try {
    const { sliderId, ...data } = req.body;
    const sliderInicioDB = await PTLSliderInicio.findOne({
      where: { sliderId }
    });
    if (!sliderInicioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una sliderInicio con ese ID'
      });
    }
    await PTLSliderInicio.update(data, {
      where: { sliderId }
    });
    const sliderInicioActualizado = await PTLSliderInicio.findOne({ where: { sliderId } });
    return res.status(200).json({
      ok: true,
      sliderInicio: sliderInicioActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar la sliderInicio'
    });
  }
};

// Borrar un nuevo rol
const deleteSliderInicio = async (req, res = response) => {
  try {
    const sliderId = req.params.id;
    const sliderInicioDB = await PTLSliderInicio.findOne({
      where: { sliderId }
    });
    if (!sliderInicioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un sliderInicio con ese ID'
      });
    }
    sliderInicioEliminado = await PTLSliderInicio.destroy({
      where: { sliderId }
    });

    return res.status(200).json({
      ok: true,
      sliderInicio: sliderInicioEliminado,
      msg: 'la sliderInicio se elimino correctamente'
    });
  } catch (err) {
    console.error(err);
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
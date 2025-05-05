/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLAplicaciones = require('../models/aplicacion')(sequelize);

// Obtener todos los roles
const getAplicaciones = async (req, res) => {
  try {
    const aplicaciones = await PTLAplicaciones.findAll();
    return res.status(201).json({
      ok: true,
      aplicaciones: aplicaciones,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Aplicaciones' });
  }
};

const getAplicacionById = async (req, res) => {
  try {
    const { aplicacionId } = req.body;
    const aplicacion = await PTLAplicaciones.findById(aplicacionId);
    if (!aplicacion) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un aplicacion por el id",
      });
    }
    return res.status(201).json({
      ok: true,
      aplicacion: aplicacion,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener aplicacion' });
  }
};

// Crear un nuevo rol
const createAplicacion = async (req, res = response) => {
  try {
    const aplicacion = req.body;
    const nuevo = await PTLAplicaciones.create(aplicacion);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la aplicacion' });
  }
};

// Actualizar un nuevo rol
const updateAplicacion = async (req, res = response) => {
  try {
    const { aplicacionId } = req.body;
    const aplicacion = req.body;
    const AplicacionDB = await PTLAplicaciones.find(aplicacionId);
    if (!AplicacionDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una aplicacion por ese id",
      });
    }
    const AplicacionActualizado = await PTLAplicaciones.findByIdAndUpdate({ aplicacionId, aplicacion });
    return res.status(201).json({
      ok: true,
      aplicacion: AplicacionActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la aplicacion' });
  }
};

// Borrar una aplicacion
const deleteAplicacion = async (req, res = response) => {
  try {
    const { aplicacionId } = req.body;
    const aplicacion = await PTLAplicaciones.findOne(aplicacionId);
    if (!aplicacion) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una aplicacion por el id",
      });
    }
    const aplicacionEliminado = await PTLAplicaciones.findByIdAndDelete({ aplicacionId });
    return res.status(201).json({
      ok: true,
      aplicacion: aplicacionEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la aplicacion' });
  }
};

module.exports = {
  getAplicaciones,
  getAplicacionById,
  createAplicacion,
  updateAplicacion,
  deleteAplicacion,
};
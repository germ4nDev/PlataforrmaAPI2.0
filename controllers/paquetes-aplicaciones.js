/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLPaqueteAplicaciones = require('../models/paquete-aplicacion')(sequelize);

// Obtener todos los roles
const getPaquetesAplicaciones = async (req, res) => {
  try {
    const paquetesApps = await PTLPaqueteAplicaciones.findAll();
    return res.status(201).json({
      ok: true,
      paquetesApps: paquetesApps,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener PaquetesAplicaciones' });
  }
};

const getPaquetesAplicacionesById = async (req, res) => {
  try {
    const { paqueteAplicacionId } = req.body;
    const paquetesApps = await PTLPaqueteAplicaciones.findById(paqueteAplicacionId);
    if (!paquetesApps) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquetesApps con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      paquetesApps: paquetesApps,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el paquete' });
  }
};

// Crear un nuevo rol
const createPaqueteAplicacion = async (req, res = response) => {
  try {
    const paqueteApps = req.body;
    const nuevo = await PTLPaqueteAplicaciones.create(paqueteApps);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el paqueteApps' });
  }
};

// Actualizar un nuevo rol
const updatePaqueteAplicacion = async (req, res = response) => {
  try {
    const { paqueteAplicacionId } = req.body;
    const paqueteApps = req.body;
    const paqueteDB = await PTLPaqueteAplicaciones.find(paqueteAplicacionId);
    if (!paqueteDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    const paqueteAppsActualizado = await PTLPaqueteAplicaciones.findByIdAndUpdate({ paqueteAplicacionId, paqueteApps });
    return res.status(201).json({
      ok: true,
      paquetesApps: paqueteAppsActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el paquete' });
  }
};

// Borrar un nuevo rol
const deletePaqueteAplicacion = async (req, res = response) => {
  try {
    const { paqueteAplicacionId } = req.body;
    const paqueteDB = await PTLPaqueteAplicaciones.findOne(paqueteAplicacionId);
    if (!paqueteDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    const paqueteAppsEliminado = await PTLPaqueteAplicaciones.findByIdAndDelete({ paqueteAplicacionId });
    return res.status(201).json({
      ok: true,
      paquete: paqueteAppsEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar paquete' });
  }
};

module.exports = {
  getPaquetesAplicaciones,
  getPaquetesAplicacionesById,
  createPaqueteAplicacion,
  updatePaqueteAplicacion,
  deletePaqueteAplicacion,
};
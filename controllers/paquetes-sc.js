/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLPaquetesSC = require('../models/paquete-sc')(sequelize);

// Obtener todos los roles
const getSuscriptoresPaquetes = async (req, res) => {
  try {
    const suscriptoresApps = await PTLPaquetesSC.findAll();
    return res.status(201).json({
      ok: true,
      suscriptoresApps: suscriptoresApps,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener SuscriptoresPaquetes' });
  }
};

const getSuscriptoresPaquetesById = async (req, res) => {
  try {
    const { suscriptorPaqueteId } = req.body;
    const suscriptoresApps = await PTLPaquetesSC.findById(suscriptorPaqueteId);
    if (!suscriptoresApps) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptoresApps con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      suscriptoresApps: suscriptoresApps,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el suscriptor' });
  }
};

// Crear un nuevo rol
const createSuscriptorPaquete = async (req, res = response) => {
  try {
    const suscriptorApp = req.body;
    const nuevo = await PTLPaquetesSC.create(suscriptorApp);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el suscriptorApp' });
  }
};

// Actualizar un nuevo rol
const updateSuscriptorPaquete = async (req, res = response) => {
  try {
    const { suscriptorPaqueteId } = req.body;
    const suscriptorApp = req.body;
    const suscriptorDB = await PTLPaquetesSC.find(suscriptorPaqueteId);
    if (!suscriptorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptor con ese id",
      });
    }
    const suscriptorAppActualizado = await PTLPaquetesSC.findByIdAndUpdate({ suscriptorPaqueteId, suscriptorApp });
    return res.status(201).json({
      ok: true,
      suscriptoresApps: suscriptorAppActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el suscriptor' });
  }
};

// Borrar un nuevo rol
const deleteSuscriptorPaquete = async (req, res = response) => {
  try {
    const { suscriptorPaqueteId } = req.body;
    const suscriptorDB = await PTLPaquetesSC.findOne(suscriptorPaqueteId);
    if (!suscriptorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptor con ese id",
      });
    }
    const suscriptorAppEliminado = await PTLPaquetesSC.findByIdAndDelete({ suscriptorPaqueteId });
    return res.status(201).json({
      ok: true,
      suscriptor: suscriptorAppEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar suscriptor' });
  }
};

module.exports = {
  getSuscriptoresPaquetes,
  getSuscriptoresPaquetesById,
  createSuscriptorPaquete,
  updateSuscriptorPaquete,
  deleteSuscriptorPaquete,
};
/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSuscrioresPaquetes = require('../models/suscriptor-paquete')(sequelize);

// Obtener todos los roles
const getSuscriptoresPaquetes = async (req, res) => {
  try {
    const suscriptoresPaquetes = await PTLSuscrioresPaquetes.findAll();
    return res.status(201).json({
      ok: true,
      suscriptoresPaquetes: suscriptoresPaquetes,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener suscriptoresPaquetes' });
  }
};
 
const getSuscriptoresPaquetesById = async (req, res) => {
  try {
    const { suscriptorPaqueteId } = req.body;
    const suscriptorPaquete = await PTLSuscrioresPaquetes.findById(suscriptorPaqueteId);
    if (!suscriptorPaquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptorPaquete con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      suscriptorPaquete: suscriptorPaquete,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el suscriptorPaquete' });
  }
};

// Crear un nuevo rol
const createSuscriptorPaquete = async (req, res = response) => {
  try {
    const suscriptor = req.body;
    const nuevo = await PTLSuscrioresPaquetes.create(suscriptor);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el suscriptorPaquete' });
  }
};

// Actualizar un nuevo rol
const updateSuscriptorPaquete = async (req, res = response) => {
  try {
    const { suscriptorPaqueteId } = req.body;
    const suscriptor = req.body;
    const suscriptorDB = await PTLSuscrioresPaquetes.find(suscriptorPaqueteId);
    if (!suscriptorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptorPaquete con ese id",
      });
    }
    const suscriptorActualizado = await PTLSuscrioresPaquetes.findByIdAndUpdate({ suscriptorPaqueteId, suscriptor });
    return res.status(201).json({
      ok: true,
      suscriptorPaquete: suscriptorActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el suscriptorPaquete' });
  }
};

// Borrar un nuevo rol
const deleteSuscriptorPaquete = async (req, res = response) => {
  try {
    const { suscriptorPaqueteId } = req.body;
    const suscriptorDB = await PTLSuscrioresPaquetes.findOne(suscriptorPaqueteId);
    if (!suscriptorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptorPaquete con ese id",
      });
    }
    const suscriptorEliminado = await PTLSuscrioresPaquetes.findByIdAndDelete({ suscriptorPaqueteId });
    return res.status(201).json({
      ok: true,
      suscriptorPaquete: suscriptorEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar suscriptorPaquete' });
  }
};

module.exports = {
  getSuscriptoresPaquetes,
  getSuscriptoresPaquetesById,
  createSuscriptorPaquete,
  updateSuscriptorPaquete,
  deleteSuscriptorPaquete,
};

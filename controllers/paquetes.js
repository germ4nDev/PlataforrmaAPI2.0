/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLPaquetes = require('../models/paquete')(sequelize);

// Obtener todos los paquetes
const getPaquetes = async (req, res) => {
  try {
    const paquetes = await PTLPaquetes.findAll();
    return res.status(201).json({
      ok: true,
      paquetes: paquetes,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Paquetes' });
  }
};

const getPaqueteById = async (req, res) => {
  try {
    const { paqueteId } = req.body;
    const paquete = await PTLPaquetes.findById(paqueteId);
    if (!paquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      paquete: paquete,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los paquetes' });
  }
};

// Crear un nuevo paquete
const createPaquete = async (req, res = response) => {
  try {
    const paquete = req.body;
    const nuevo = await PTLPaquetes.create(paquete);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el paquete' });
  }
};

// Actualizar un nuevo paquete
const updatePaquete = async (req, res = response) => {
  try {
    const { paqueteId } = req.body;
    const paquete = req.body;
    const paqueteOg = await PTLPaquetes.find(paqueteId);
    if (!paqueteOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    const paqueteActualizado = await PTLPaquetes.findByIdAndUpdate({ paqueteId, paquete });
    return res.status(201).json({
      ok: true,
      paquete: paqueteActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el paquete' });
  }
};

// Borrar un paquete
const deletePaquete = async (req, res = response) => {
  try {
    const { paqueteId } = req.body;
    const paquete = await PTLPaquetes.findOne(paqueteId);
    if (!paquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    const paqueteEliminado = await PTLPaquetes.findByIdAndDelete({ paqueteId });
    return res.status(201).json({
      ok: true,
      paquete: paqueteEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar paquete' });
  }
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete,
};
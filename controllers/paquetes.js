/*
    Author: German Valencia
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
    const paqueteId = req.params.id;
    const paquete = await PTLPaquetes.findOne({
      where: { paqueteId },
    });
    if (!paquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      paquete: paquete,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

const createPaquete = async (req, res = response) => {
  try {
    const paquete = req.body;
    const nuevo = await PTLPaquetes.create(paquete);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el paquete' });
  }
};

const updatePaquete = async (req, res = response) => {
  try {
    const paqueteId = req.params.id;
    const data = req.body;
    const paqueteOg = await PTLPaquetes.findOne({
      where: { paqueteId },
    });
    if (!paqueteOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete por ese id",
      });
    }
    await PTLPaquetes.update(data, {
      where: { paqueteId }
    });
    const paqueteActualizado = await PTLPaquetes.findOne({ where: { versionId } });
    return res.status(201).json({
      ok: true,
      paquete: paqueteActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el paquete' });
  }
};

const deletePaquete = async (req, res = response) => {
  try {
    const paqueteId = req.params.id;
    const paquete = await PTLPaquetes.findOne({
      where: { paqueteId },
    });
    if (!paquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete por ese id",
      });
    }
    const paqueteEliminado = await PTLPaquetes.destroy({
      where: { paqueteId }
    });
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
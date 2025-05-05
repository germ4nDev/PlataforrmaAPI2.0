/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLVersionesAP = require('../models/version-ap')(sequelize);

// Obtener todos los versionAPes
const getVersioesAP = async (req, res) => {
  try {
    const versiones = await PTLVersionesAP.findAll();
    return res.status(201).json({
      ok: true,
      versiones: versiones,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener versionesA{' });
  }
};

const getVersioesAPById = async (req, res) => {
  try {
    const { versionesId } = req.body;
    const versionAP = await PTLVersionesAP.findById(versionesId);
    if (!versionAP) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un versionAP por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      versionAP: versionAP,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener versionAP' });
  }
};

// Crear un nuevo versionAP
const createVersionAP = async (req, res = response) => {
  try {
    const versionAP = req.body;
    const nuevo = await PTLVersionesAP.create(versionAP);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear ;a VersionAP' });
  }
};

// Actualizar un nuevo versionAP
const updateVersionAP = async (req, res = response) => {
  try {
    const { versionesId } = req.body;
    const versionAP = req.body;
    const versionAPDB = await PTLVersionesAP.find(versionesId);
    if (!versionAP) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un versionAP por ese id",
      });
    }
    const versionAPActualizado = await PTLVersionesAP.findByIdAndUpdate({ versionesId, versionAPDB });
    return res.status(201).json({
      ok: true,
      versionAP: versionAPActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la versionAP' });
  }
};

// Borrar un nuevo versionAP
const deleteVersionAP = async (req, res = response) => {
  try {
    const { versionesId } = req.body;
    const versionAPDB = await PTLVersionesAP.findOne(versionesId);
    if (!versionAPDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un versionesId por ese id",
      });
    }
    const versionAPEliminado = await PTLVersionesAP.findByIdAndDelete({ versionesId });
    return res.status(201).json({
      ok: true,
      versionAP: versionAPEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario versionAP' });
  }
};

module.exports = {
  getVersioesAP,
  getVersioesAPById,
  createVersionAP,
  updateVersionAP,
  deleteVersionAP,
};

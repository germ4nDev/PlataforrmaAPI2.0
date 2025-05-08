/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLVersionesAP = require('../models/version-ap')(sequelize);

// Obtener todos las versionAP
const getVersionesAP = async (req, res) => {
  try {
    const versiones = await PTLVersionesAP.findAll();
    return res.status(201).json({
      ok: true,
      versiones: versiones,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la versionesAP' });
  }
};

const getVersionesAPById = async (req, res) => {
  try {
    const { versionesId } = req.body;
    const versionAP = await PTLVersionesAP.findById(versionesId);
    if (!versionAP) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una versionAP con ese id",
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

// Crear una nueva versionAP
const createVersionAP = async (req, res = response) => {
  try {
    const versionAP = req.body;
    const nuevo = await PTLVersionesAP.create(versionAP);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la VersionAP' });
  }
};

// Actualizar una versionAP
const updateVersionAP = async (req, res = response) => {
  try {
    const { versionesId } = req.body;
    const versionAP = req.body;
    const versionAPDB = await PTLVersionesAP.find(versionesId);
    if (!versionAP) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una versionAP con ese id",
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

// Borrar una versionAP
const deleteVersionAP = async (req, res = response) => {
  try {
    const { versionesId } = req.body;
    const versionAPDB = await PTLVersionesAP.findOne(versionesId);
    if (!versionAPDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una versionAP con ese id",
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
  getVersionesAP,
  getVersionesAPById,
  createVersionAP,
  updateVersionAP,
  deleteVersionAP,
};

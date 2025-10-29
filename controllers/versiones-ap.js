/*
    Author: German Valencia
    Actualizado: German Valiencia 20251026
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLVersionesAP = require('../models/version-ap')(sequelize);

const getVersionesAP = async (req, res) => {
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

const getVersionesAPById = async (req, res) => {
  try {
    const codigoVersion = req.params.id;
    const version = await PTLVersionesAP.findOne({
      where: { codigoVersion },
    });
    if (!version) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un versionAP por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      version: version,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener versionAP' });
  }
};

const createVersionAP = async (req, res = response) => {
  try {
    const versionAP = req.body;
    console.log('datos version', versionAP);
    const nuevo = await PTLVersionesAP.create(versionAP);
    return res.status(201).json({
      ok: true,
      version: nuevo,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear ;a VersionAP' });
  }
};

const updateVersionAP = async (req, res = response) => {
  try {
    const codigoVersion = req.params.id;
    const data = req.body;
    const version = await PTLVersionesAP.findOne({
      where: { codigoVersion },
    });
    if (!version) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un versionAP por ese id",
      });
    }
    await PTLVersionesAP.update(data, {
      where: { codigoVersion }
    });
    const versionAPActualizado = await PTLVersionesAP.findOne({ where: { codigoVersion } });
    return res.status(201).json({
      ok: true,
      version: versionAPActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la versionAP' });
  }
};

const deleteVersionAP = async (req, res = response) => {
  try {
    const codigoVersion = req.params.id;
    const version = await PTLVersionesAP.findOne({
      where: { codigoVersion },
    });
    if (!version) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un versionesId por ese id",
      });
    }
    const versionAPEliminado = await PTLVersionesAP.destroy({
      where: { codigoVersion }
    });
    return res.status(201).json({
      ok: true,
      version: versionAPEliminado,
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

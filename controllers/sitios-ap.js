/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSitiosAP = require('../models/sitio-ap')(sequelize);

// Obtener todos los sitios
const getSitios = async (req, res) => {
  try {
    const sitios = await PTLSitiosAP.findAll();
    return res.status(201).json({
      ok: true,
      sitios: sitios,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los sitios' });
  }
};

const getSitioById = async (req, res) => {
  try {
    const { sitioId } = req.body;
    const sitio = await PTLSitiosAP.findById(sitioId);
    if (!sitio) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un sitio con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      sitios: role,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el sitio' });
  }
};

// Crear un nuevo sitio
const createSitio = async (req, res = response) => {
  try {
    const { sitioId } = req.body;
    const nuevo = await PTLSitiosAP.create({ sitioId });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el sitio' });
  }
};

// Actualizar un sitio
const updateSitio = async (req, res = response) => {
  try {
    const { sitioId } = req.body;
    const sitio = req.body;
    const sitioBD = await PTLSitiosAP.find(sitioId);
    if (!sitioBD) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un sitio con ese id",
      });
    }
    const sitioBDActualizado = await PTLSitiosAP.findByIdAndUpdate({ sitioId, sitio });
    return res.status(201).json({
      ok: true,
      sitios: sitioBDActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el sitio' });
  }
};

// Borrar un sitio
const deleteSitio = async (req, res = response) => {
  try {
    const { sitioId } = req.body;
    const sitioDB = await PTLSitiosAP.findOne(sitioId);
    if (!sitioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un sitio con ese id",
      });
    }
    const sitioDBEliminado = await PTLSitiosAP.findByIdAndDelete({ sitioId });
    return res.status(201).json({
      ok: true,
      sitios: sitioDBEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el sitio' });
  }
};

module.exports = {
  getSitios,
  getSitioById,
  createSitio,
  updateSitio,
  deleteSitio,
};

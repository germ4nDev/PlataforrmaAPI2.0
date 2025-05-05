/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSuscriptoresAP = require('../models/suscriptor')(sequelize);

// Obtener todos los roles
const getSuscriptores = async (req, res) => {
  try {
    const suscriptores = await PTLSuscriptoresAP.findAll();
    return res.status(201).json({
      ok: true,
      suscriptores: suscriptores,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Suscriptores' });
  }
};

const getSuscriptoresById = async (req, res) => {
  try {
    const { suscriptorId } = req.body;
    const suscriptor = await PTLSuscriptoresAP.findById(suscriptorId);
    if (!suscriptor) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptor con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      suscriptor: suscriptor,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el suscriptor' });
  }
};

// Crear un nuevo rol
const createSuscriptor = async (req, res = response) => {
  try {
    const suscriptor = req.body;
    const nuevo = await PTLSuscriptoresAP.create(suscriptor);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el suscriptor' });
  }
};

// Actualizar un nuevo rol
const updateSuscriptor = async (req, res = response) => {
  try {
    const { suscriptorId } = req.body;
    const suscriptor = req.body;
    const suscriptorDB = await PTLSuscriptoresAP.find(suscriptorId);
    if (!suscriptorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptor con ese id",
      });
    }
    const suscriptorActualizado = await PTLSuscriptoresAP.findByIdAndUpdate({ suscriptorId, suscriptor });
    return res.status(201).json({
      ok: true,
      suscriptor: suscriptorActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el suscriptor' });
  }
};

// Borrar un nuevo rol
const deleteSuscriptor = async (req, res = response) => {
  try {
    const { suscriptorId } = req.body;
    const suscriptorDB = await PTLSuscriptoresAP.findOne(suscriptorId);
    if (!suscriptorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptor con ese id",
      });
    }
    const suscriptorEliminado = await PTLSuscriptoresAP.findByIdAndDelete({ suscriptorId });
    return res.status(201).json({
      ok: true,
      suscriptor: suscriptorEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar suscriptor' });
  }
};

module.exports = {
  getSuscriptores,
  getSuscriptoresById,
  createSuscriptor,
  updateSuscriptor,
  deleteSuscriptor,
};

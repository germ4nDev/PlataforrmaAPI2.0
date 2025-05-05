/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLEnlacesST = require('../models/enlace-st')(sequelize);

// Obtener todos los Enlace
const getEnlaces = async (req, res) => {
  try {
    const enlace = await PTLEnlacesST.findAll();
    return res.status(201).json({
      ok: true,
      enlace: enlace,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener en enlace' });
  }
};

const getEnlaceById = async (req, res) => {
  try {
    const { enlaceId } = req.body;
    const enlace = await PTLEnlacesST.findById(enlaceId);
    if (!enlace) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un enlace con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      enlace: enlace,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el enlace' });
  }
};

// Crear un nuevo enlace
const createEnlace = async (req, res = response) => {
  try {
    const { enlaceId } = req.body;
    const nuevo = await PTLEnlacesST.create({ enlaceId });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el enlace' });
  }
};

// Actualizar un nuevo enlace
const updateEnlace = async (req, res = response) => {
  try {
    const { enlaceId } = req.body;
    const enlace = req.body;
    const enlaceBD = await PTLEnlacesST.find(enlaceId);
    if (!enlaceBD) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un enlace con ese id",
      });
    }
    const enlaceBDActualizado = await PTLEnlacesST.findByIdAndUpdate({ enlaceId, enlace });
    return res.status(201).json({
      ok: true,
      enlace: enlaceBDActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el enlace' });
  }
};

// Borrar un nuevo enlace
const deleteEnlace = async (req, res = response) => {
  try {
    const { enlaceId } = req.body;
    const enlaceDB = await PTLEnlacesST.findOne(enlaceId);
    if (!enlaceDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un enlace con ese id",
      });
    }
    const enlaceDBEliminado = await PTLEnlacesST.findByIdAndDelete({ enlaceId });
    return res.status(201).json({
      ok: true,
      enlace: enlaceDBEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el enlace' });
  }
};

module.exports = {
    getEnlaces,
    getEnlaceById,
    createEnlace,
    updateEnlace,
    deleteEnlace,
};

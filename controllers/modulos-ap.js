/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTModulosAP = require('../models/modulo-ap')(sequelize);

// Obtener todos los modulos
const getModulos = async (req, res) => {
  try {
    const modulos = await PTModulosAP.findAll();
    return res.status(201).json({
      ok: true,
      modulos: modulos,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Modulos' });
  }
};

const getModuloById = async (req, res) => {
  try {
    const { moduloId } = req.body;
    const modulo = await PTModulosAP.findById(moduloId);
    if (!modulo) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un modulo por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      modulo: modulo,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

// Crear un nuevo modulo
const createModulo = async (req, res = response) => {
  try {
    const modulo = req.body;
    const nuevo = await PTModulosAP.create(modulo);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el modulo' });
  }
};

// Actualizar un nuevo modulo
const updateModulo = async (req, res = response) => {
  try {
    const { moduloId } = req.body;
    const modulo = req.body;
    const moduloOg = await PTModulosAP.find(moduloId);
    if (!moduloOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un modulo por ese id",
      });
    }
    const moduloActualizado = await PTModulosAP.findByIdAndUpdate({ moduloId, modulo });
    return res.status(201).json({
      ok: true,
      modulo: moduloActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el modulo' });
  }
};

// Borrar un nuevo modulo
const deleteModulo = async (req, res = response) => {
  try {
    const { moduloId } = req.body;
    const modulo = await PTModulosAP.findOne(moduloId);
    if (!modulo) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un modulo por ese id",
      });
    }
    const moduloEliminado = await PTModulosAP.findByIdAndDelete({ moduloId });
    return res.status(201).json({
      ok: true,
      modulo: moduloEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar modulo' });
  }
};

module.exports = {
  getModulos,
  getModuloById,
  createModulo,
  updateModulo,
  deleteModulo,
};

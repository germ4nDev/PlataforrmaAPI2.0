/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLRequerimientosTK = require('../models/requerimiento-tk')(sequelize);

// Obtener todos los requerimientos
const getRequerimientosTK = async (req, res) => {
  try {
    const requerimientos = await PTLRequerimientosTK.findAll();
    return res.status(201).json({
      ok: true,
      requerimientos: requerimientos,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener RequerimientosTK' });
  }
};

const getRequerimientoTKById = async (req, res) => {
  try {
    const { requerimientoId } = req.body;
    const requerimiento = await PTLRequerimientosTK.findById(requerimientoId);
    if (!requerimiento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un requerimiento con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      requerimiento: requerimiento,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener requerimientos' });
  }
};

// Crear un nuevo requerimiento
const createRequerimientoTK = async (req, res = response) => {
  try {
    const requerimiento = req.body;
    const nuevo = await PTLRequerimientosTK.create(requerimiento);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el requerimiento' });
  }
};

// Actualizar un requerimiento
const updateRequerimientoTK = async (req, res = response) => {
  try {
    const { requerimientoId } = req.body;
    const requerimiento = req.body;
    const requerimientoOg = await PTLRequerimientosTK.find(requerimientoId);
    if (!requerimientoOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un requerimiento con ese id",
      });
    }
    const requerimientoActualizado = await PTLRequerimientosTK.findByIdAndUpdate({ requerimientoId, requerimiento });
    return res.status(201).json({
      ok: true,
      requerimiento: requerimientoActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el requerimiento' });
  }
};

// Borrar un requerimiento
const deleteRequerimientoTK = async (req, res = response) => {
  try {
    const { requerimientoId } = req.body;
    const requerimiento = await PTLRequerimientosTK.findOne(requerimientoId);
    if (!requerimiento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un requerimiento con ese id",
      });
    }
    const requerimientoEliminado = await PTLRequerimientosTK.findByIdAndDelete({ requerimientoId });
    return res.status(201).json({
      ok: true,
      requerimiento: requerimientoEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar requerimiento' });
  }
};

module.exports = {
  getRequerimientosTK,
  getRequerimientoTKById,
  createRequerimientoTK,
  updateRequerimientoTK,
  deleteRequerimientoTK,
};
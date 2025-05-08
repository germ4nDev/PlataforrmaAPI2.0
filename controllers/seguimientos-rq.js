/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSeguimientosRQ = require('../models/seguimiento-rq')(sequelize);

// Obtener todos los seguimientos
const getSeguimientosRQ = async (req, res) => {
  try {
    const seguimientos = await PTLSeguimientosRQ.findAll();
    return res.status(201).json({
      ok: true,
      seguimientos: seguimientos,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener SeguimientosRQ' });
  }
};

const getSeguimientoRQById = async (req, res) => {
  try {
    const { seguimientoId } = req.body;
    const seguimiento = await PTLSeguimientosRQ.findById(seguimientoId);
    if (!seguimiento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un seguimiento con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      seguimiento: seguimiento,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener seguimientos' });
  }
};

// Crear un nuevo seguimiento
const createSeguimientoRQ = async (req, res = response) => {
  try {
    const seguimiento = req.body;
    const nuevo = await PTLSeguimientosRQ.create(seguimiento);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el seguimiento' });
  }
};

// Actualizar un seguimiento
const updateSeguimientoRQ = async (req, res = response) => {
  try {
    const { seguimientoId } = req.body;
    const seguimiento = req.body;
    const seguimientoOg = await PTLSeguimientosRQ.find(seguimientoId);
    if (!seguimientoOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un seguimiento con ese id",
      });
    }
    const seguimientoActualizado = await PTLSeguimientosRQ.findByIdAndUpdate({ seguimientoId, seguimiento });
    return res.status(201).json({
      ok: true,
      seguimiento: seguimientoActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el seguimiento' });
  }
};

// Borrar un seguimiento
const deleteSeguimientoRQ = async (req, res = response) => {
  try {
    const { seguimientoId } = req.body;
    const seguimiento = await PTLSeguimientosRQ.findOne(seguimientoId);
    if (!seguimiento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un seguimiento con ese id",
      });
    }
    const seguimientoEliminado = await PTLSeguimientosRQ.findByIdAndDelete({ seguimientoId });
    return res.status(201).json({
      ok: true,
      seguimiento: seguimientoEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar seguimiento' });
  }
};

module.exports = {
  getSeguimientosRQ,
  getSeguimientoRQById,
  createSeguimientoRQ,
  updateSeguimientoRQ,
  deleteSeguimientoRQ,
};
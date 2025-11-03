/*
    Author: German Valencia
    Actualización: John Castañeda

*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSeguimientosRQ = require('../models/seguimiento')(sequelize);

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
    const seguimientoId = req.params.id;
    const seguimiento = await PTLSeguimientosRQ.findOne({
      where: {
        seguimientoId: seguimientoId,
      },
    });
    if (!seguimiento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un seguimiento por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      seguimiento: seguimiento,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener seguimiento" });
  }
};

// Crear un nuevo seguimiento
const createSeguimientoRQ = async (req, res = response) => {
  try {
    const { ...newRegistro } = req.body;
    const seguimientoDB = await PTLSeguimientosRQ.create(newRegistro);
    return res.status(201).json({
      ok: true,
      seguimiento: seguimientoDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el seguimiento'
    });
  }
};

// Actualizar un nuevo seguimiento
const updateSeguimientoRQ = async (req, res = response) => {
  try {
    const { seguimientoId, ...data } = req.body;
    const seguimientoDB = await PTLSeguimientosRQ.findOne({
      where: { seguimientoId }
    });
    if (!seguimientoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un seguimiento con ese ID'
      });
    }
    await PTLSeguimientosRQ.update(data, {
      where: { seguimientoId }
    });
    const seguimientoActualizado = await PTLSeguimientosRQ.findOne({ where: { seguimientoId } });
    return res.status(200).json({
      ok: true,
      seguimiento: seguimientoActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el seguimiento'
    });
  }
};

// Borrar un nuevo seguimiento
const deleteSeguimientoRQ = async (req, res = response) => {
  try {
    const seguimientoId = req.params.id;
    const seguimientoDB = await PTLSeguimientosRQ.findOne({
      where: { seguimientoId }
    });
    if (!seguimientoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un seguimiento con ese ID'
      });
    }
    seguimientoEliminado = await PTLSeguimientosRQ.destroy({
      where: { seguimientoId }
    });

    return res.status(200).json({
      ok: true,
      usuario: seguimientoEliminado,
      msg: 'seguimiento eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el seguimiento'
    });
  }
};

module.exports = {
  getSeguimientosRQ,
  getSeguimientoRQById,
  createSeguimientoRQ,
  updateSeguimientoRQ,
  deleteSeguimientoRQ,
};
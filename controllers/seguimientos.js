/*
    Author: German Valencia
    Actualización: John Castañeda

*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSeguimientosTK = require('../models/seguimiento')(sequelize);

// Obtener todos los seguimientos
const getSeguimientosTK = async (req, res) => {
  try {
    const seguimientos = await PTLSeguimientosTK.findAll();
    return res.status(201).json({
      ok: true,
      seguimientos: seguimientos,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener SeguimientosTK' });
  }
};

const getSeguimientoTKById = async (req, res) => {
  try {
    const codigoSeguimiento = req.params.id;
    const seguimiento = await PTLSeguimientosTK.findOne({
      where: {
        codigoSeguimiento: codigoSeguimiento,
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

const getSeguimientoTKByTicket = async (req, res) => {
  try {
    const codigoTicket = req.params.id;
    const seguimientos = await PTLSeguimientosTK.findAll({
      where: {
        codigoTicket: codigoTicket,
      },
    });
    return res.status(201).json({
      ok: true,
      seguimientos: seguimientos,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener seguimiento" });
  }
};

// Crear un nuevo seguimiento
const createSeguimientoTK = async (req, res = response) => {
  const { ...newRegistro } = req.body;
  try {
    const seguimientoDB = await PTLSeguimientosTK.create(newRegistro);
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
const updateSeguimientoTK = async (req, res = response) => {
  try {
    const { codigoSeguimiento, ...data } = req.body;
    const seguimientoDB = await PTLSeguimientosTK.findOne({
      where: { codigoSeguimiento }
    });
    if (!seguimientoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un seguimiento con ese ID'
      });
    }
    await PTLSeguimientosTK.update(data, {
      where: { codigoSeguimiento }
    });
    const seguimientoActualizado = await PTLSeguimientosTK.findOne({ where: { codigoSeguimiento } });
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
const deleteSeguimientoTK = async (req, res = response) => {
  try {
    const codigoSeguimiento = req.params.id;
    const seguimientoDB = await PTLSeguimientosTK.findOne({
      where: { codigoSeguimiento }
    });
    if (!seguimientoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un seguimiento con ese ID'
      });
    }
    seguimientoEliminado = await PTLSeguimientosTK.destroy({
      where: { codigoSeguimiento }
    });
    return res.status(200).json({
      ok: true,
      seguimiento: seguimientoEliminado,
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
  getSeguimientosTK,
  getSeguimientoTKById,
  getSeguimientoTKByTicket,
  createSeguimientoTK,
  updateSeguimientoTK,
  deleteSeguimientoTK,
};
/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSuscriptoresPQ = require('../models/suscriptor-pq')(sequelize);

// Obtener todos los roles
const getSuscriptoresPQ = async (req, res) => {
  try {
    const suscritoresPQ = await PTLSuscriptoresPQ.findAll();
    return res.status(201).json({
      ok: true,
      suscritoresPQ: suscritoresPQ,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los suscriptores' });
  }
};

const getSuscriptoresPQById = async (req, res) => {
  try {
    const suscriptorPaqueteId = req.params.id;
    const suscriptorPaquete = await PTLSuscriptoresPQ.findOne({
      where: {
        suscriptorPaqueteId: suscriptorPaqueteId,
      },
    });
    if (!suscriptorPaquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptorPaquete por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      suscriptorPaquete: suscriptorPaquete,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener suscriptorPaquete" });
  }
};

// Crear un nuevo rol
const createSuscriptorPQ = async (req, res = response) => {
  try {
    const nuevoPaquetePQ = req.body;
    const paquetePQDB = await PTLSuscriptoresPQ.create(nuevoPaquetePQ);
    return res.status(201).json({
      ok: true,
      suscriptorPaquete: paquetePQDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el suscriptorPaquete'
    });
  }
};

// Actualizar un nuevo rol
const updateSuscriptorPQ = async (req, res = response) => {
  try {
    const { suscriptorPaqueteId, ...data } = req.body;
    const paquetePQDB = await PTLSuscriptoresPQ.findOne({
      where: { suscriptorPaqueteId }
    });
    if (!paquetePQDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un suscriptorPaquete con ese ID'
      });
    }
    await PTLSuscriptoresPQ.update(data, {
      where: { suscriptorPaqueteId }
    });
    const suscriptorPaqueteActualizado = await PTLSuscriptoresPQ.findOne({ where: { suscriptorPaqueteId } });
    return res.status(200).json({
      ok: true,
      suscriptorPaquete: suscriptorPaqueteActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el suscriptorPaquete'
    });
  }
};

// Borrar un nuevo rol
const deleteSuscriptorPQ = async (req, res = response) => {
  try {
    const suscriptorPaqueteId = req.params.id;
    const paquetePQDB = await PTLSuscriptoresPQ.findOne({
      where: { suscriptorPaqueteId }
    });
    if (!paquetePQDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un suscriptorPaquete con ese ID'
      });
    }
    suscriptorPaqueteEliminado = await PTLSuscriptoresPQ.destroy({
      where: { suscriptorPaqueteId }
    });

    return res.status(200).json({
      ok: true,
      usuario: suscriptorPaqueteEliminado,
      msg: 'suscriptorPaquete eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el suscriptorPaquete'
    });
  }
};

module.exports = {
  getSuscriptoresPQ,
  getSuscriptoresPQById,
  createSuscriptorPQ,
  updateSuscriptorPQ,
  deleteSuscriptorPQ,
};
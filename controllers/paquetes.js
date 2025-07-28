/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLPaquetes = require('../models/paquete')(sequelize);

// Obtener todos los paquetes
const getPaquetes = async (req, res) => {
  try {
    const paquetes = await PTLPaquetes.findAll();
    return res.status(201).json({
      ok: true,
      paquetes: paquetes,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los paquetes' });
  }
};

const getPaqueteById = async (req, res) => {
  try {
    const paqueteId = req.params.id;
    const paquete = await PTLPaquetes.findOne({
      where: {
        paqueteId: paqueteId,
      },
    });
    if (!paquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un Paquete por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      paquete: paquete,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Paquete" });
  }
};

// Crear un nuevo paquete
const createPaquete = async (req, res = response) => {
  try {
    const nuevoPaquete = req.body;
    const paqueteDB = await PTLPaquetes.create(nuevoPaquete);
    return res.status(201).json({
      ok: true,
      paquete: paqueteDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el paquete'
    });
  }
};

// Actualizar un nuevo paquete
const updatePaquete = async (req, res = response) => {
  try {
    const { paqueteId, ...data } = req.body;
    const paqueteDB = await PTLPaquetes.findOne({
      where: { paqueteId }
    });
    if (!paqueteDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un paquete con ese ID'
      });
    }
    await PTLPaquetes.update(data, {
      where: { paqueteId }
    });
    const paqueteActualizado = await PTLPaquetes.findOne({ where: { paqueteId } });
    return res.status(200).json({
      ok: true,
      paquete: paqueteActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el paquete'
    });
  }
};

// Borrar un nuevo paquete
const deletePaquete = async (req, res = response) => {
  try {
    const paqueteId = req.params.id;
    const paqueteDB = await PTLPaquetes.findOne({
      where: { paqueteId }
    });
    if (!paqueteDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un paquete con ese ID'
      });
    }
    paqueteEliminado = await PTLPaquetes.destroy({
      where: { paqueteId }
    });

    return res.status(200).json({
      ok: true,
      usuario: paqueteEliminado,
      msg: 'paquete eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el paquete'
    });
  }
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete,
};
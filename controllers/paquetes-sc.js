/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLPaquetesSC = require('../models/paquete-sc')(sequelize);

// Obtener todos los roles
const getPaquetesSC = async (req, res) => {
  try {
    const suscritorPaquetes = await PTLPaquetesSC.findAll();
    return res.status(201).json({
      ok: true,
      suscritorPaquetes: suscritorPaquetes,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los pasuscritorPuetes' });
  }
};

const getPaquetesSCById = async (req, res) => {
  try {
    const suscriptorPaqueteId = req.params.id;
    const suscriptorPaquete = await PTLPaquetesSC.findOne({
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
const createPaqueteSC = async (req, res = response) => {
  try {
    const nuevoPaqueteSC = req.body;
    const paqueteSCDB = await PTLPaquetesSC.create(nuevoPaqueteSC);
    return res.status(201).json({
      ok: true,
      suscriptorPaquete: paqueteSCDB
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
const updatePaqueteSC = async (req, res = response) => {
  try {
    const { suscriptorPaqueteId, ...data } = req.body;
    const paqueteSCDB = await PTLPaquetesSC.findOne({
      where: { suscriptorPaqueteId }
    });
    if (!paqueteSCDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un suscrptorPaquete con ese ID'
      });
    }
    await PTLPaquetesSC.update(data, {
      where: { suscriptorPaqueteId }
    });
    const suscrptorPaqueteActualizado = await PTLPaquetesSC.findOne({ where: { suscriptorPaqueteId } });
    return res.status(200).json({
      ok: true,
      suscrptorPaquete: suscrptorPaqueteActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el suscrptorPaquete'
    });
  }
};

// Borrar un nuevo rol
const deletePaqueteSC = async (req, res = response) => {
  try {
    const suscriptorPaqueteId = req.params.id;
    const paqueteSCDB = await PTLPaquetesSC.findOne({
      where: { suscriptorPaqueteId }
    });
    if (!paqueteSCDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un suscriptorPaquete con ese ID'
      });
    }
    suscriptorPaqueteEliminado = await PTLPaquetesSC.destroy({
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
  getPaquetesSC,
  getPaquetesSCById,
  createPaqueteSC,
  updatePaqueteSC,
  deletePaqueteSC,
};
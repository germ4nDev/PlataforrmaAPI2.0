/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLTextosID = require('../models/texto-id')(sequelize);
const { io } = require('../index');

// Obtener todos los textoIDes
const getTextosID = async (req, res) => {
  try {
    const testosID = await PTLTextosID.findAll();
    return res.status(201).json({
      ok: true,
      textosId: testosID,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener TextosID' });
  }
};

const getTextosIDById = async (req, res) => {
  try {
    const { textoId } = req.body;
    const textoID = await PTLTextosID.findById(textoId);
    if (!textoID) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un textoID con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      textoID: textoID,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el textoID' });
  }
};

// Crear un nuevo textoID
const createTextoID = async (req, res = response) => {
  try {
    const { ...newRegistro } = req.body;
    const nuevo = await PTLTextosID.create(newRegistro);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el textoID' });
  }
};

// Actualizar un nuevo textoID
const updateTextoID = async (req, res = response) => {
  try {
    const { textoId } = req.body;
    const textoID = req.body;
    const textoIDDB = await PTLTextosID.find(textoId);
    if (!textoIDDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un textoID con ese id",
      });
    }
    const textoIDActualizado = await PTLTextosID.findByIdAndUpdate({ textoId, textoID });
    return res.status(201).json({
      ok: true,
      textoID: textoIDActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el textoID' });
  }
};

// Borrar un nuevo textoID
const deleteTextoID = async (req, res = response) => {
  try {
    const { textoId } = req.body;
    const textoIDDB = await PTLTextosID.findOne(textoId);
    if (!textoIDDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un textoID con ese id",
      });
    }
    const textoIDEliminado = await PTLTextosID.findByIdAndDelete({ textoId });
    return res.status(201).json({
      ok: true,
      textoID: textoIDEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar textoID' });
  }
};

module.exports = {
  getTextosID,
  getTextosIDById,
  createTextoID,
  updateTextoID,
  deleteTextoID,
};

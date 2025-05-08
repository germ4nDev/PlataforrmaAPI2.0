/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLIdiomas = require('../models/idioma')(sequelize);

// Obtener todos los idiomas
const getIdiomas = async (req, res) => {
  try {
    const idiomas = await PTLIdiomas.findAll();
    return res.status(201).json({
      ok: true,
      idiomas: idiomas,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener idiomas' });
  }
};

const getIdiomaById = async (req, res) => {
  try {
    const { idiomaId } = req.body;
    const idioma = await PTLIdiomas.findById(idiomaId);
    if (!idioma) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un idioma con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      idioma: idioma,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener idioma' });
  }
};

// Crear un nuevo idioma
const createIdioma = async (req, res = response) => {
  try {
    const idioma = req.body;
    const nuevo = await PTLIdiomas.create(idioma);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la idioma' });
  }
};

// Actualizar un idioma
const updateIdioma = async (req, res = response) => {
  try {
    const { idiomaId } = req.body;
    const idioma = req.body;
    const IdiomaDB = await PTLIdiomas.find(idiomaId);
    if (!IdiomaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un idioma con ese id",
      });
    }
    const idiomaActualizado = await PTLIdiomas.findByIdAndUpdate({ idiomaId, idioma });
    return res.status(201).json({
      ok: true,
      idioma: idiomaActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la Idioma' });
  }
};

// Borrar un idioma
const deleteIdioma = async (req, res = response) => {
  try {
    const { idiomaId } = req.body;
    const idiomaDB = await PTLIdiomas.findOne(idiomaId);
    if (!idiomaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un idioma con ese id",
      });
    }
    const idiomaEliminado = await PTLIdiomas.findByIdAndDelete({ idiomaId });
    return res.status(201).json({
      ok: true,
      idioma: idiomaEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la idioma' });
  }
};

module.exports = {
  getIdiomas,
  getIdiomaById,
  createIdioma,
  updateIdioma,
  deleteIdioma,
};
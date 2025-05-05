/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLContenidosEL = require('../models/contenido-el')(sequelize);

// Obtener todos los Contenido
const getContenidos = async (req, res) => {
  try {
    const contenido = await PTLContenidosEL.findAll();
    return res.status(201).json({
      ok: true,
      contenido: contenido,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener en Contenido' });
  }
};

const getContenidoById = async (req, res) => {
  try {
    const { contenidoId } = req.body;
    const contenido = await PTLContenidosEL.findById(contenidoId);
    if (!contenido) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un Contenido con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      contenido: role,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el Contenido' });
  }
};

// Crear un nuevo Contenido
const createContenido = async (req, res = response) => {
  try {
    const { contenidoId } = req.body;
    const nuevo = await PTLContenidosEL.create({ contenidoId });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el Contenido' });
  }
};

// Actualizar un nuevo Contenido
const updateContenido = async (req, res = response) => {
  try {
    const { contenidoId } = req.body;
    const contenido = req.body;
    const contenidoBD = await PTLContenidosEL.find(contenidoId);
    if (!contenidoBD) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un Contenido con ese id",
      });
    }
    const contenidoBDActualizado = await PTLContenidosEL.findByIdAndUpdate({ contenidoId, contenido });
    return res.status(201).json({
      ok: true,
      contenido: contenidoBDActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el Contenido' });
  }
};

// Borrar un nuevo Contenido
const deleteContenido = async (req, res = response) => {
  try {
    const { contenidoId } = req.body;
    const contenidoDB = await PTLContenidosEL.findOne(contenidoId);
    if (!contenidoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un Contenido con ese id",
      });
    }
    const contenidoDBEliminado = await PTLContenidosEL.findByIdAndDelete({ contenidoId });
    return res.status(201).json({
      ok: true,
      contenido: contenidoDBEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el Contenido' });
  }
};

module.exports = {
    getContenidos,
    getContenidoById,
    createContenido,
    updateContenido,
    deleteContenido,
};

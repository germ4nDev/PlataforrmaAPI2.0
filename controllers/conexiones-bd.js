/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLConexionesBD = require('../models/conexion-bd')(sequelize);

// Obtener todos los roles
const getConexionesBD = async (req, res) => {
  try {
    const conexiones = await PTLConexionesBD.findAll();
    return res.status(201).json({
      ok: true,
      conexiones: conexiones,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ConezionesBD' });
  }
};

const getConexionById = async (req, res) => {
  try {
    const { conexionId } = req.body;
    const conexion = await PTLConexionesBD.findById(conexionId);
    if (!conexion) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un conexion por el id",
      });
    }
    return res.status(201).json({
      ok: true,
      conexion: conexion,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener conexion' });
  }
};

// Crear un nuevo rol
const createConexion = async (req, res = response) => {
  try {
    const conexion = req.body;
    const nuevo = await PTLConexionesBD.create(conexion);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la conexion' });
  }
};

// Actualizar un nuevo rol
const updateConexion = async (req, res = response) => {
  try {
    const { conexionId } = req.body;
    const conexion = req.body;
    const ConexionDB = await PTLConexionesBD.find(conexionId);
    if (!ConexionDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una conexion por ese id",
      });
    }
    const conexionDBActualizado = await PTLConexionesBD.findByIdAndUpdate({ conexionId, conexion });
    return res.status(201).json({
      ok: true,
      conexion: conexionDBActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la ConexionDB' });
  }
};

// Borrar un nuevo rol
const deleteConexion = async (req, res = response) => {
  try {
    const { conexionId } = req.body;
    const conexionDB = await PTLConexionesBD.findOne(conexionId);
    if (!conexionDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una conexion por el id",
      });
    }
    const conexionDBEliminado = await PTLConexionesBD.findByIdAndDelete({ conexionId });
    return res.status(201).json({
      ok: true,
      conexion: conexionDBEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la conexion' });
  }
};

module.exports = {
  getConexionesBD,
  getConexionById,
  createConexion,
  updateConexion,
  deleteConexion,
};
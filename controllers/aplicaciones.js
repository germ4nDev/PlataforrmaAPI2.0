/*
    Author: German Valencia
*/
const express = require("express");
const sequelize = require("../database/connection");
const PTLAplicaciones = require("../models/aplicacion")(sequelize);

// Obtener todos los roles
const getAplicaciones = async (req, res) => {
  try {
    const aplicaciones = await PTLAplicaciones.findAll();
    return res.status(201).json({
      ok: true,
      aplicaciones: aplicaciones,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Aplicaciones" });
  }
};

const getAplicacionById = async (req, res) => {
  try {
    const aplicacionId = req.params.id;
    const aplicacion = await PTLAplicaciones.findOne({
      where: {
        aplicacionId: aplicacionId,
      },
    });
    if (!aplicacion) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un aplicacion por el id",
      });
    }
    return res.status(201).json({
      ok: true,
      aplicacion: aplicacion,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener aplicacion" });
  }
};

const createAplicacion = async (req, res = response) => {
  try {
    const nuevaAplicacion = req.body;
    const existente = await PTLAplicaciones.findOne({
      where: { codigoAplicacion: nuevaAplicacion.codigoAplicacion }
    });
    if (existente) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe una aplicación con ese código'
      });
    }
    const aplicacionDB = await PTLAplicaciones.create(nuevaAplicacion);
    return res.status(201).json({
      ok: true,
      aplicacion: aplicacionDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear la aplicación'
    });
  }
};

const updateAplicacion = async (req, res = response) => {
  try {
    const { aplicacionId, ...data } = req.body;
    const aplicacionDB = await PTLAplicaciones.findOne({
      where: { aplicacionId }
    });
    if (!aplicacionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una aplicación con ese ID'
      });
    }
    await PTLAplicaciones.update(data, {
      where: { aplicacionId }
    });
    const aplicacionActualizada = await PTLAplicaciones.findOne({ where: { aplicacionId } });
    return res.status(200).json({
      ok: true,
      aplicacion: aplicacionActualizada
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar la aplicación'
    });
  }
};

const deleteAplicacion = async (req, res = response) => {
  try {
    const aplicacionId = req.params.id;
    const aplicacionDB = await PTLAplicaciones.findOne({
      where: { aplicacionId }
    });
    if (!aplicacionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una aplicación con ese ID'
      });
    }
    const aplicacionEliminada = await PTLAplicaciones.destroy({
      where: { aplicacionId }
    });
    
    return res.status(200).json({
      ok: true,
      aplicacion: aplicacionEliminada,
      msg: 'Aplicación eliminada correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar la aplicación'
    });
  }
};

module.exports = {
  getAplicaciones,
  getAplicacionById,
  createAplicacion,
  updateAplicacion,
  deleteAplicacion,
};

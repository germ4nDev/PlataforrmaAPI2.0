/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLConexionesBD = require('../models/conexion-bd')(sequelize);

const getConexionesBD = async (req, res) => {
  try {
    const conexiones = await PTLConexionesBD.findAll();
    return res.status(201).json({
      ok: true,
      conexiones: conexiones,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la ConexionBD' });
  }
};

const getConexionById = async (req, res) => {
  try {
    const codigoConexion = req.params.id;
    const conexion = await PTLConexionesBD.findOne({
      where: {
        codigoConexion: codigoConexion,
      },
    });
    if (!conexion) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una conexion por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      conexion: conexion,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la conexion" });
  }
};

const createConexion = async (req, res = response) => {
  try {
    const { ...newRegistro } = req.body;
    const conexionDB = await PTLConexionesBD.create(newRegistro);
    return res.status(201).json({
      ok: true,
      conexion: conexionDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear la conexion'
    });
  }
};

const updateConexion = async (req, res = response) => {
  try {
    const { codigoConexion, ...data } = req.body;
    const conexionDB = await PTLConexionesBD.findOne({
      where: { codigoConexion }
    });
    if (!conexionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una conexion con ese ID'
      });
    }
    await PTLConexionesBD.update(data, {
      where: { codigoConexion }
    });
    const conexionActualizado = await PTLConexionesBD.findOne({ where: { codigoConexion } });
    return res.status(200).json({
      ok: true,
      conexion: conexionActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar la conexion'
    });
  }
};

const deleteConexion = async (req, res = response) => {
  try {
    const codigoConexion = req.params.id;
    const conexionDB = await PTLConexionesBD.findOne({
      where: { codigoConexion }
    });
    if (!conexionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un conexion con ese ID'
      });
    }
    conexionEliminado = await PTLConexionesBD.destroy({
      where: { codigoConexion }
    });

    return res.status(200).json({
      ok: true,
      usuario: conexionEliminado,
      msg: 'la conexion se elimino correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar la conexion'
    });
  }
};

module.exports = {
  getConexionesBD,
  getConexionById,
  createConexion,
  updateConexion,
  deleteConexion,
};
/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLServidor = require('../models/servidor')(sequelize);

// Obtener todos los servidores
const getServidores = async (req, res) => {
  try {
    const servidores = await PTLServidor.findAll();
    return res.status(201).json({
      ok: true,
      servidores: servidores,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener servidores' });
  }
};

const getServidorById = async (req, res) => {
  try {
    const servidorId = req.params.id;
    const servidor = await PTLServidor.findOne({
      where: {
        servidorId: servidorId,
      },
    });
    if (!servidor) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un servidor por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      servidor: servidor,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener servidor" });
  }
};

// Crear un nuevo servidor
const createServidor = async (req, res = response) => {
  try {
    const nuevoServidor = req.body;
    const servidorDB = await PTLServidor.create(nuevoServidor);
    return res.status(201).json({
      ok: true,
      servidor: servidorDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el servidor'
    });
  }
};

// Actualizar un nuevo servidor
const updateServidor = async (req, res = response) => {
  try {
    const { servidorId, ...data } = req.body;
    const servidorDB = await PTLServidor.findOne({
      where: { servidorId }
    });
    if (!servidorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un servidor con ese ID'
      });
    }
    await PTLServidor.update(data, {
      where: { servidorId }
    });
    const servidorActualizado = await PTLServidor.findOne({ where: { servidorId } });
    return res.status(200).json({
      ok: true,
      servidor: servidorActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el servidor'
    });
  }
};

// Borrar un nuevo servidor
const deleteServidor = async (req, res = response) => {
  try {
    const servidorId = req.params.id;
    const servidorDB = await PTLServidor.findOne({
      where: { servidorId }
    });
    if (!servidorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un servidor con ese ID'
      });
    }
    servidorEliminado = await PTLServidor.destroy({
      where: { servidorId }
    });

    return res.status(200).json({
      ok: true,
      usuario: servidorEliminado,
      msg: 'servidor eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el servidor'
    });
  }
};

module.exports = {
  getServidores,
  getServidorById,
  createServidor,
  updateServidor,
  deleteServidor,
};
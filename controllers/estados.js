/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLEstados = require('../models/estado')(sequelize);

// Obtener todos los estados
const getEstados = async (req, res) => {
  try {
    const estados = await PTLEstados.findAll();
    return res.status(201).json({
      ok: true,
      estados: estados,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los estados' });
  }
};

const getEstadosById = async (req, res) => {
  try {
    const estadoId = req.params.id;
    const estado = await PTLEstados.findOne({
      where: {
        estadoId: estadoId,
      },
    });
    if (!estado) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un estado por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      estado: estado,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener estado" });
  }
};

// Crear un nuevo estado
const createEstado = async (req, res = response) => {
  try {
    const nuevoEstado = req.body;
    const estadoDB = await PTLEstados.create(nuevoEstado);
    return res.status(201).json({
      ok: true,
      estado: estadoDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el estado'
    });
  }
};

// Actualizar un nuevo estado
const updateEstado = async (req, res = response) => {
  try {
    const { estadoId, ...data } = req.body;
    const estadoDB = await PTLEstados.findOne({
      where: { estadoId }
    });
    if (!estadoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un estado con ese ID'
      });
    }
    await PTLEstados.update(data, {
      where: { estadoId }
    });
    const estadoActualizado = await PTLEstados.findOne({ where: { estadoId } });
    return res.status(200).json({
      ok: true,
      estado: estadoActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el estado'
    });
  }
};

// Borrar un nuevo estado
const deleteEstado = async (req, res = response) => {
  try {
    const estadoId = req.params.id;
    const estadoDB = await PTLEstados.findOne({
      where: { estadoId }
    });
    if (!estadoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un estado con ese ID'
      });
    }
    estadoEliminado = await PTLEstados.destroy({
      where: { estadoId }
    });

    return res.status(200).json({
      ok: true,
      usuario: estadoEliminado,
      msg: 'estado eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el estado'
    });
  }
};

module.exports = {
  getEstados,
  getEstadosById,
  createEstado,
  updateEstado,
  deleteEstado,
};
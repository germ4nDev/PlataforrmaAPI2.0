/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLTiposValores = require('../models/tipo-valor')(sequelize);

// Obtener todos los tiposValores
const getTiposValores = async (req, res) => {
  try {
    const tiposValores = await PTLTiposValores.findAll();
    return res.status(201).json({
      ok: true,
      tiposValores: tiposValores,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los tiposValores' });
  }
};

const getTiposValoresById = async (req, res) => {
  try {
    const tipoValorId = req.params.id;
    const tipoValor = await PTLTiposValores.findOne({
      where: {
        tipoValorId: tipoValorId,
      },
    });
    if (!tipoValor) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un tipoValor por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      tipoValor: tipoValor,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tipoValor" });
  }
};

// Crear un nuevo tipoValor
const createTipoValor = async (req, res = response) => {
  try {
    const nuevoTipoValor = req.body;
    const tipoValorDB = await PTLTiposValores.create(nuevoTipoValor);
    return res.status(201).json({
      ok: true,
      tipoValor: tipoValorDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el tipoValor'
    });
  }
};

// Actualizar un nuevo tipoValor
const updateTipoValor = async (req, res = response) => {
  try {
    const { tipoValorId, ...data } = req.body;
    const tipoValorDB = await PTLTiposValores.findOne({
      where: { tipoValorId }
    });
    if (!tipoValorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un tipoValor con ese ID'
      });
    }
    await PTLTiposValores.update(data, {
      where: { tipoValorId }
    });
    const tipoValorActualizado = await PTLTiposValores.findOne({ where: { tipoValorId } });
    return res.status(200).json({
      ok: true,
      tipoValor: tipoValorActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el tipoValor'
    });
  }
};

// Borrar un nuevo tipoValor
const deleteTipoValor = async (req, res = response) => {
  try {
    const tipoValorId = req.params.id;
    const tipoValorDB = await PTLTiposValores.findOne({
      where: { tipoValorId }
    });
    if (!tipoValorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un tipoValor con ese ID'
      });
    }
    tipoValorEliminado = await PTLTiposValores.destroy({
      where: { tipoValorId }
    });

    return res.status(200).json({
      ok: true,
      usuario: tipoValorEliminado,
      msg: 'tipoValor eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el tipoValor'
    });
  }
};

module.exports = {
  getTiposValores,
  getTiposValoresById,
  createTipoValor,
  updateTipoValor,
  deleteTipoValor,
};
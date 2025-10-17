/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLTiposValor = require('../models/tipo-valor')(sequelize);

const getTiposValor = async (req, res) => {
  try {
    const tipos = await PTLTiposValor.findAll();
    return res.status(201).json({
      ok: true,
      tiposValor: tipos,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los tiposValor ' + err });
  }
};

const getTiposValorById = async (req, res) => {
  try {
    const tipoValorId = req.params.id;
    const tipoValor = await PTLTiposValor.findOne({
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
const createTkipoValor = async (req, res = response) => {
  try {
    const nuevoTkipoValor = req.body;
    const tipoValorDB = await PTLTiposValor.create(nuevoTkipoValor);
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
const updateTkipoValor = async (req, res = response) => {
  try {
    const { tipoValorId, ...data } = req.body;
    const tipoValorDB = await PTLTiposValor.findOne({
      where: { tipoValorId }
    });
    if (!tipoValorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un tipoValor con ese ID'
      });
    }
    await PTLTiposValor.update(data, {
      where: { tipoValorId }
    });
    const tipoValorActualizado = await PTLTiposValor.findOne({ where: { tipoValorId } });
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
const deleteTkipoValor = async (req, res = response) => {
  try {
    const tipoValorId = req.params.id;
    const tipoValorDB = await PTLTiposValor.findOne({
      where: { tipoValorId }
    });
    if (!tipoValorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un tipoValor con ese ID'
      });
    }
    tipoValorEliminado = await PTLTiposValor.destroy({
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
  getTiposValor,
  getTiposValorById,
  createTkipoValor,
  updateTkipoValor,
  deleteTkipoValor,
};
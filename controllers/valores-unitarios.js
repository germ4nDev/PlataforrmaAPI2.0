/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTKValoresUnitarios = require('../models/valor-unitario')(sequelize);

const getValoresUnitarios = async (req, res) => {
  try {
    const valoresUnitarios = await PTKValoresUnitarios.findAll();
    return res.status(201).json({
      ok: true,
      valoresUnitarios: valoresUnitarios,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener valoresUnitarios' });
  }
};

const getValoresUnitariosById = async (req, res) => {
  try {
    const valorUnitarioId = req.params.id;
    const valorUnitario = await PTKValoresUnitarios.findOne({
      where: { valorUnitarioId },
    });
    if (!valorUnitario) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un valorUnitario por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      valorUnitario: valorUnitario,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener valorUnitario' });
  }
};

const createValorUnitario = async (req, res = response) => {
  try {
    const valorUnitario = req.body;
    console.log('datos valorUnitario', valorUnitario);
    const nuevo = await PTKValoresUnitarios.create(valorUnitario);
    return res.status(201).json({
      ok: true,
      valorUnitario: nuevo,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear ;a ValorUnitario' });
  }
};

const updateValorUnitario = async (req, res = response) => {
  try {
    const valorUnitarioId = req.params.id;
    const data = req.body;
    const valorUnitario = await PTKValoresUnitarios.findOne({
      where: { valorUnitarioId },
    });
    if (!valorUnitario) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un valorUnitario por ese id",
      });
    }
    await PTKValoresUnitarios.update(data, {
      where: { valorUnitarioId }
    });
    const valorUnitarioActualizado = await PTKValoresUnitarios.findOne({ where: { valorUnitarioId } });
    return res.status(201).json({
      ok: true,
      valorUnitario: valorUnitarioActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la valorUnitario' });
  }
};

const deleteValorUnitario = async (req, res = response) => {
  try {
    const valorUnitarioId = req.params.id;
    const valorUnitario = await PTKValoresUnitarios.findOne({
      where: { valorUnitarioId },
    });
    if (!valorUnitario) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un valoresUnitarios por ese id",
      });
    }
    const valorUnitarioEliminado = await PTKValoresUnitarios.destroy({
      where: { valorUnitarioId }
    });
    return res.status(201).json({
      ok: true,
      valorUnitario: valorUnitarioEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario valorUnitario' });
  }
};

module.exports = {
  getValoresUnitarios,
  getValoresUnitariosById,
  createValorUnitario,
  updateValorUnitario,
  deleteValorUnitario,
};

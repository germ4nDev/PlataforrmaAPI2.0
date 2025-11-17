/*
    Author: German Valencia
    Actualizado: German Valiencia 20251026
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTKValoresUnitarios = require('../models/valor-unitario')(sequelize);
const { io } = require('../index');

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
    const codigoValor = req.params.id;
    const valorUnitario = await PTKValoresUnitarios.findOne({
      where: { codigoValor },
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
  const { ...newRegistro } = req.body;
  try {
    const nuevo = await PTKValoresUnitarios.create(newRegistro);
    io.emit("valores-unitarios-actualizados", {
      action: "create",
      msg: `Valor Unitario creado: ${nuevo.nombreValor}`,
    });
    return res.status(201).json({
      ok: true,
      valorUnitario: nuevo,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear ;a ValorUnitario' });
  }
};

const updateValorUnitario = async (req, res = response) => {
  const { codigoValor, ...data } = req.body;
  try {
    const valorUnitario = await PTKValoresUnitarios.findOne({
      where: { codigoValor },
    });
    if (!valorUnitario) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un valorUnitario por ese id",
      });
    }
    await PTKValoresUnitarios.update(data, {
      where: { codigoValor }
    });
    const valorUnitarioActualizado = await PTKValoresUnitarios.findOne({ where: { codigoValor } });
    io.emit("valores-unitarios-actualizados", {
      action: "update",
      msg: `Valor Unitario actualizado: ${valorUnitarioActualizado.nombreValor}`,
    });
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
    const codigoValor = req.params.id;
    const valorUnitario = await PTKValoresUnitarios.findOne({
      where: { codigoValor },
    });
    if (!valorUnitario) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un valoresUnitarios por ese id",
      });
    }
    const valorUnitarioEliminado = await PTKValoresUnitarios.destroy({
      where: { codigoValor }
    });
    io.emit("valores-unitarios-actualizados", {
      action: "delete",
      msg: `Valor Unitario eliminado: ${valorUnitarioEliminado.nombreValor}`,
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

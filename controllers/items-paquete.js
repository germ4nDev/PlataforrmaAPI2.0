/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLItemsPaquete = require('../models/item-paquete')(sequelize);
const { io } = require('../index');

const getItemsPaquete = async (req, res) => {
  try {
    const itemsPaquete = await PTLItemsPaquete.findAll();
    return res.status(201).json({
      ok: true,
      itemsPaquete: itemsPaquete,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ItemsPaquete, ' + err });
  }
};

const getItemsPaqueteById = async (req, res) => {
  try {
    const codigoItem = req.params.id;
    const itemsPaquete = await PTLItemsPaquete.findOne({
      where: { codigoItem },
    });
    if (!itemsPaquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un itemsPaquete con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      itemsPaquete: itemsPaquete,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el paquete' });
  }
};

const getItemsPaqueteByCode = async (req, res) => {
  try {
    const codego = req.params.code;
    const itemsPaquete = await PTLItemsPaquete.findAll({
      where: {
        codigoPaquete: codego,
      },
    });
    if (!itemsPaquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un itemsPaquete por el codigo",
      });
    }
    return res.status(201).json({
      ok: true,
      itemsPaquete: itemsPaquete,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener itemsPaquete" });
  }
};

const createItemsPaquete = async (req, res = response) => {
  const { ...newRegistro } = req.body;
  try {
    const nuevo = await PTLItemsPaquete.create(newRegistro);
    io.emit('items-paquete-actualizados', {
      action: 'create',
      msg: `Item creado: ${nuevo.nombreItem}`
    });
    return res.status(201).json({
      ok: true,
      estado: estadoDB
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el itemsPaquete' });
  }
};

const updateItemsPaquete = async (req, res = response) => {
  const { codigoItem, ...data } = req.body;
  try {
    const itemsPaqueteOg = await PTLItemsPaquete.findOne({
      where: { codigoItem },
    });
    if (!itemsPaqueteOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    await PTLItemsPaquete.update(data, {
      where: { codigoItem },
    });
    const itemsPaqueteActualizado = await PTLItemsPaquete.findOne({
      where: { codigoItem },
    });
    io.emit('items-paquete-actualizados', {
      action: 'update',
      msg: `Item actualizado: ${itemsPaqueteActualizado.nombreItem}`
    });
    return res.status(201).json({
      ok: true,
      itemsPaquete: itemsPaqueteActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el paquete' });
  }
};

const deleteItemsPaquete = async (req, res = response) => {
  try {
    const codigoItem = req.params.id;
    const itemsPaquete = await PTLItemsPaquete.findOne({
      where: { codigoItem },
    });
    if (!itemsPaquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    const itemsPaqueteEliminado = await PTLItemsPaquete.destroy({
      where: { codigoItem },
    });
    io.emit('items-paquete-actualizados', {
      action: 'delete',
      msg: `Item eliminado: ${itemsPaquete.nombreItem}`
    });
    return res.status(201).json({
      ok: true,
      itemsPaquete: itemsPaqueteEliminado
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar itemsPaquete' });
  }
};

module.exports = {
  getItemsPaquete,
  getItemsPaqueteById,
  getItemsPaqueteByCode,
  createItemsPaquete,
  updateItemsPaquete,
  deleteItemsPaquete,
};
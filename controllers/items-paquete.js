/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLItemsPaquete = require('../models/items-paquete')(sequelize);

const getItemsPaquete = async (req, res) => {
  try {
    const itemsPaquete = await PTLItemsPaquete.findAll();
    return res.status(201).json({
      ok: true,
      itemsPaquete: itemsPaquete,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ItemsPaquete' });
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

const createItemsPaquete = async (req, res = response) => {
  try {
    const { ...newRegistro } = req.body;
    const nuevo = await PTLItemsPaquete.create(newRegistro);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el itemsPaquete' });
  }
};

const updateItemsPaquete = async (req, res = response) => {
  try {
    const { codigoItem, ...data } = req.body;
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
  createItemsPaquete,
  updateItemsPaquete,
  deleteItemsPaquete,
};
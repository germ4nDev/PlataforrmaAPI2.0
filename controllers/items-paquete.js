/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLItemsPaquete = require('../models/items-paquete')(sequelize);

// Obtener todos los roles
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
    const itemId = req.params.id;
    const itemsPaquete = await PTLItemsPaquete.findOne({
      where: { itemId },
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

// Crear un nuevo rol
const createItemsPaquete = async (req, res = response) => {
  try {
    const itemsPaquete = req.body;
    const nuevo = await PTLItemsPaquete.create(itemsPaquete);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el itemsPaquete' });
  }
};

// Actualizar un nuevo rol
const updateItemsPaquete = async (req, res = response) => {
  try {
    const itemId = req.params.id;
    const itemsPaquete = req.body;
    const itemsPaqueteOg = await PTLItemsPaquete.findOne({
      where: { itemId },
    });
    if (!itemsPaqueteOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    await PTLItemsPaquete.update(itemsPaquete, {
      where: { itemId },
    });
    const itemsPaqueteActualizado = await PTLItemsPaquete.findOne({
      where: { itemId },
    });
    return res.status(201).json({
      ok: true,
      itemsPaquete: itemsPaqueteActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el paquete' });
  }
};

// Borrar un nuevo rol
const deleteItemsPaquete = async (req, res = response) => {
  try {
    const itemId = req.params.id;
    const itemsPaquete = await PTLItemsPaquete.findOne({
      where: { itemId },
    });
    if (!itemsPaquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    const itemsPaqueteEliminado = await PTLItemsPaquete.destroy({
      where: { itemId },
    });
    return res.status(201).json({
      ok: true,
      itemsPaquete: itemsPaqueteEliminado,
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
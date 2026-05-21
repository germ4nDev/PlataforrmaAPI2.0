/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ItemService = require("../services/items.service");
const service = new ItemService();

const getItems = async (req, res = response) => {
  try {
    const items = await service.getItems();
    res.status(200).json({ ok: true, items });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getItemById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const item = await service.getItemById(id);
    res.status(200).json({ ok: true, item });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createItem = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const item = await service.createItem({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, item });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateItem = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const item = await service.updateItem(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, item });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteItem = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteItem(id);
    res.status(200).json({ ok: true, msg: "Ítem eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
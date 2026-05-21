/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const TiposItemService = require("../services/tipos-item.service");
const service = new TiposItemService();

const getTiposItem = async (req, res = response) => {
  try {
    const tiposItems = await service.getTiposItem();
    res.status(200).json({ ok: true, tiposItems });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getTipoItemById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const tipoItem = await service.getTipoItemById(id);
    res.status(200).json({ ok: true, tipoItem });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createTipoItem = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const tipoItem = await service.createTipoItem({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, tipoItem });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateTipoItem = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const tipoItem = await service.updateTipoItem(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, tipoItem });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteTipoItem = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteTipoItem(id);
    res.status(200).json({ ok: true, msg: "Tipo de valor eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getTiposItem,
  getTipoItemById,
  createTipoItem,
  updateTipoItem,
  deleteTipoItem
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const TipoEstadoService = require("../services/tipos-estados.service");
const service = new TipoEstadoService();

const getTiposEstados = async (req, res = response) => {
  try {
    const tiposEstados = await service.getTiposEstados();
    res.status(200).json({ ok: true, tiposEstados });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getTipoEstadoById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const tipoEstado = await service.getTipoEstadoById(id);
    res.status(200).json({ ok: true, tipoEstado });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createTipoEstado = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const tipoEstado = await service.createTipoEstado({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, tipoEstado });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateTipoEstado = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const tipoEstado = await service.updateTipoEstado(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, tipoEstado });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteTipoEstado = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteTipoEstado(id);
    res.status(200).json({ ok: true, msg: "Tipo de estado eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getTiposEstados,
  getTipoEstadoById,
  createTipoEstado,
  updateTipoEstado,
  deleteTipoEstado
};
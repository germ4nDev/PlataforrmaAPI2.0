/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const TipoLogService = require("../services/tipos-logs.service");
const service = new TipoLogService();

const getTiposLogs = async (req, res = response) => {
  try {
    const tiposLog = await service.getTiposLogs();
    res.status(200).json({ ok: true, tiposLog });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getTipoLogById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const tipoLog = await service.getTipoLogById(id);
    res.status(200).json({ ok: true, tipoLog });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createTipoLog = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const tipoLog = await service.createTipoLog({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, tipoLog });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateTipoLog = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const tipoLog = await service.updateTipoLog(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, tipoLog });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteTipoLog = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteTipoLog(id);
    res.status(200).json({ ok: true, msg: "Tipo de log eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getTiposLogs,
  getTipoLogById,
  createTipoLog,
  updateTipoLog,
  deleteTipoLog
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const LogsActualizacionService = require("../services/log-actualizaciones.service");
const service = new LogsActualizacionService();

const getLogs = async (req, res = response) => {
  try {
    const respuesta = await service.getLogsActualizaciones();
    res.status(200).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getLogById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const respuesta = await service.getLogActualizacionPorId(id);
    res.status(200).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createLog = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario || 'SISTEMA';
    const respuesta = await service.createLogActualizacion({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getLogs,
  getLogById,
  createLog
};
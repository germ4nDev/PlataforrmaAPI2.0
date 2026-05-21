/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const LogsTransaccionService = require("../services/log-transacciones.service");
const service = new LogsTransaccionService();

const getLogs = async (req, res = response) => {
  try {
    const respuesta = await service.getLogsTransacciones();
    res.status(200).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getLogById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const respuesta = await service.getLogTransaccionPorId(id);
    res.status(200).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createLog = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario || 'SISTEMA';
    const respuesta = await service.createLogTransaccion({ ...req.body, usuarioAccion });
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
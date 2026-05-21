/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const LogsActividadService = require("../services/log-actividades.service");
const service = new LogsActividadService();

const getLogs = async (req, res = response) => {
  try {
    const log_actividades = await service.getLogsActividades();
    res.status(200).json({ ok: true, log_actividades });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getLogById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const log_actividad = await service.getLogActividadPorId(id);
    res.status(200).json({ ok: true, log_actividad });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createLog = async (req, res = response) => {
  try {
    // Para los logs, el usuario que realiza la acción es fundamental
    const usuarioAccion = req.usuario?.codigoUsuario || 'SISTEMA';
    const log_actividad = await service.createLogActividad({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, log_actividad });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getLogs,
  getLogById,
  createLog
};
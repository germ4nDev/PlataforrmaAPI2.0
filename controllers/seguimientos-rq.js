/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const SeguimientosService = require("../services/seguimientos-rq.service");
const service = new SeguimientosService();

const getSeguimientos = async (req, res = response) => {
  try {
    const seguimientos = await service.getSeguimientos();
    res.status(200).json({ ok: true, seguimientos });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getSeguimientoById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const seguimiento = await service.getSeguimientoById(id);
    res.status(200).json({ ok: true, seguimiento });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const getSeguimientosByTicket = async (req, res = response) => {
  try {
    const { ticketId } = req.params;
    const seguimientos = await service.getSeguimientosByTicket(ticketId);
    res.status(200).json({ ok: true, seguimientos });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const createSeguimiento = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const seguimiento = await service.createSeguimiento({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, seguimiento });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateSeguimiento = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const seguimiento = await service.updateSeguimiento(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, seguimiento });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteSeguimiento = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteSeguimiento(id);
    res.status(200).json({ ok: true, msg: "Seguimiento eliminado" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getSeguimientos,
  getSeguimientoById,
  getSeguimientosByTicket,
  createSeguimiento,
  updateSeguimiento,
  deleteSeguimiento
};
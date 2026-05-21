/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ClasesTicketService = require("../services/clases-ticlet.service");
const service = new ClasesTicketService();

const getClasesTickets = async (req, res = response) => {
  try {
    const clasesTicket = await service.getClasesTicket();
    res.status(200).json({ ok: true, clasesTicket });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getClaseTicketById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const claseTicket = await service.getClaseTicketPorId(id);
    res.status(200).json({ ok: true, claseTicket });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createClaseTicket = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const claseTicket = await service.createClaseTicket({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, claseTicket });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateClaseTicket = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const claseTicket = await service.updateClaseTicket(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, claseTicket });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteClaseTicket = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteClaseTicket(id);
    res.status(200).json({ ok: true, msg: "Registro eliminado" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getClasesTickets,
  getClaseTicketById,
  createClaseTicket,
  updateClaseTicket,
  deleteClaseTicket
};
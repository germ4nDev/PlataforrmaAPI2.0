/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const EstadoService = require("../services/estados.service");
const service = new EstadoService();

const getEstados = async (req, res = response) => {
  try {
    const estados = await service.obtenerEstados();
    res.status(200).json({ ok: true, estados });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getEstadoById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const estado = await service.obtenerEstadoPorId(id);
    res.status(200).json({ ok: true, estado });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createEstado = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const estado = await service.crearEstado({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, estado });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateEstado = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const estado = await service.actualizarEstado(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, estado });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteEstado = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.eliminarEstado(id);
    res.status(200).json({ ok: true, msg: "Estado eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getEstados,
  getEstadoById,
  createEstado,
  updateEstado,
  deleteEstado
};
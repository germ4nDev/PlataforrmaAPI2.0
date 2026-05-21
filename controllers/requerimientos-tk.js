/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const RequerimientosService = require("../services/requerimientos-tk.service");
const service = new RequerimientosService();

const getRequerimientos = async (req, res = response) => {
  try {
    const requerimientos = await service.getRequerimientos();
    res.status(200).json({ ok: true, requerimientos });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getRequerimientoById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const requerimiento = await service.getRequerimientoById(id);
    res.status(200).json({ ok: true, requerimiento });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createRequerimiento = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const requerimiento = await service.createRequerimiento({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, requerimiento });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateRequerimiento = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const requerimiento = await service.updateRequerimiento(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, requerimiento });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteRequerimiento = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteRequerimiento(id);
    res.status(200).json({ ok: true, msg: "Requerimiento eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getRequerimientos,
  getRequerimientoById,
  createRequerimiento,
  updateRequerimiento,
  deleteRequerimiento
};
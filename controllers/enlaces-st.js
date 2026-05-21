/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const EnlaceSTService = require("../services/enlaces-st.service");
const service = new EnlaceSTService();

const getEnlaces = async (req, res = response) => {
  try {
    const enlaces = await service.obtenerEnlaces();
    res.status(200).json({ ok: true, enlaces });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getEnlaceById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const enlace = await service.obtenerEnlacePorId(id);
    res.status(200).json({ ok: true, enlace });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createEnlace = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const enlace = await service.crearEnlace({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, enlace });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateEnlace = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const enlace = await service.actualizarEnlace(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, enlace });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteEnlace = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.eliminarEnlace(id);
    res.status(200).json({ ok: true, msg: "Enlace eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getEnlaces,
  getEnlaceById,
  createEnlace,
  updateEnlace,
  deleteEnlace
};
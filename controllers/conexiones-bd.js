/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ConexionBDService = require("../services/conexiones-bd.service");
const service = new ConexionBDService();

const getConexiones = async (req, res = response) => {
  try {
    const conexiones = await service.getConexiones();
    res.status(200).json({ ok: true, conexiones });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getConexionById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const conexion = await service.getConexionPorId(id);
    res.status(200).json({ ok: true, conexion });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createConexion = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const conexion = await service.createConexion({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, conexion });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateConexion = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const conexion = await service.actualizarConexion(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, conexion });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteConexion = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.eliminarConexion(id);
    res.status(200).json({ ok: true, msg: "Conexión eliminada correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getConexiones,
  getConexionById,
  createConexion,
  updateConexion,
  deleteConexion
};
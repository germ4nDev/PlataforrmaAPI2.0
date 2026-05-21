/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ServidorService = require("../services/servidores.service");
const service = new ServidorService();

const getServidores = async (req, res = response) => {
  try {
    const servidores = await service.getServidores();
    res.status(200).json({ ok: true, servidores });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getServidorById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const servidor = await service.getServidorById(id);
    res.status(200).json({ ok: true, servidor });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createServidor = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const servidor = await service.createServidor({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, servidor });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateServidor = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const servidor = await service.updateServidor(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, servidor });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteServidor = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteServidor(id);
    res.status(200).json({ ok: true, msg: "Servidor eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getServidores,
  getServidorById,
  createServidor,
  updateServidor,
  deleteServidor
};
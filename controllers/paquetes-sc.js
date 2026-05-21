/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const PaqueteSCService = require("../services/paquetes-sc.service");
const service = new PaqueteSCService();

const getPaquetes = async (req, res = response) => {
  try {
    const paquetes = await service.getPaquetesSC();
    res.status(200).json({ ok: true, paquetes });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getPaqueteById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const paquete = await service.getPaqueteSCById(id);
    res.status(200).json({ ok: true, paquete });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createPaquete = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const paquete = await service.createPaqueteSC({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, paquete });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updatePaquete = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const paquete = await service.updatePaqueteSC(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, paquete });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deletePaquete = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deletePaqueteSC(id);
    res.status(200).json({ ok: true, msg: "Paquete eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete
};
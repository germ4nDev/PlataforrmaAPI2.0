/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const SuscriptoresService = require("../services/suscriptores.service");
const service = new SuscriptoresService();

const getSuscriptores = async (req, res = response) => {
  try {
    const suscriptores = await service.getSuscriptores();
    res.status(200).json({ ok: true, suscriptores });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getSuscriptorById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const suscriptor = await service.getSuscriptorById(id);
    res.status(200).json({ ok: true, suscriptor });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createSuscriptor = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const suscriptor = await service.createSuscriptor({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, suscriptor });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateSuscriptor = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const suscriptor = await service.updateSuscriptor(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, suscriptor });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteSuscriptor = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteSuscriptor(id);
    res.status(200).json({ ok: true, msg: "Suscriptor eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getSuscriptores,
  getSuscriptorById,
  createSuscriptor,
  updateSuscriptor,
  deleteSuscriptor
};
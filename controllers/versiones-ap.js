/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const VersionesAPService = require("../services/versiones-ap.service");
const service = new VersionesAPService();

const getVersionesAP = async (req, res = response) => {
  try {
    const versiones = await service.getVersionesAP();
    res.status(200).json({ ok: true, versiones });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getVersionAPById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const version = await service.getVersionAPById(id);
    res.status(200).json({ ok: true, version });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createVersionAP = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const version = await service.createVersionAP({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, version });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateVersionAP = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const version = await service.updateVersionAP(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, version });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteVersionAP = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteVersionAP(id);
    res.status(200).json({ ok: true, msg: "Versión AP eliminada correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getVersionesAP,
  getVersionAPById,
  createVersionAP,
  updateVersionAP,
  deleteVersionAP
};
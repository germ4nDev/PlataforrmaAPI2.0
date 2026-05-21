/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const SuitesAPService = require("../services/suites-ap.service");
const service = new SuitesAPService();

const getSuites = async (req, res = response) => {
  try {
    const suites = await service.getSuites();
    res.status(200).json({ ok: true, suites });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getSuiteById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const respuesta = await service.getSuiteById(id);
    res.status(200).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createSuite = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const respuesta = await service.createSuite({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateSuite = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const respuesta = await service.updateSuite(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteSuite = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteSuite(id);
    res.status(200).json({ ok: true, msg: "Suite eliminada correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getSuites,
  getSuiteById,
  createSuite,
  updateSuite,
  deleteSuite
};
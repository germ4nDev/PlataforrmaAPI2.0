/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const SitioAPService = require("../services/sitios-ap.service");
const service = new SitioAPService();

const getSitios = async (req, res = response) => {
  try {
    const sitios = await service.getSitios();
    res.status(200).json({ ok: true, sitios });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getSitioById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const sitio = await service.getSitioById(id);
    res.status(200).json({ ok: true, sitio });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createSitio = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const sitio = await service.createSitio({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, sitio });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateSitio = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const sitio = await service.updateSitio(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, sitio });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteSitio = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteSitio(id);
    res.status(200).json({ ok: true, msg: "Sitio eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getSitios,
  getSitioById,
  createSitio,
  updateSitio,
  deleteSitio
};
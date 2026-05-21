/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const TextoIDService = require("../services/textos-id.service");
const service = new TextoIDService();

const getTextos = async (req, res = response) => {
  try {
    const respuesta = await service.getTextos();
    res.status(200).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getTextoById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const respuesta = await service.getTextoById(id);
    res.status(200).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createTexto = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const respuesta = await service.createTexto({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateTexto = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const respuesta = await service.updateTexto(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, respuesta });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteTexto = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteTexto(id);
    res.status(200).json({ ok: true, msg: "Texto eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getTextos,
  getTextoById,
  createTexto,
  updateTexto,
  deleteTexto
};
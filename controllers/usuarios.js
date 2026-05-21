/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const UsuariosService = require("../services/usuarios.service");
const service = new UsuariosService();

const getUsuarios = async (req, res = response) => {
  try {
    const usuarios = await service.getUsuarios();
    res.status(200).json({ ok: true, usuarios });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getUsuarioById = async (req, res = response) => {
  try {
    const { id } = req.params; // codigoUsuario
    const usuario = await service.getUsuarioById(id);
    res.status(200).json({ ok: true, usuario });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const validatePassword = async (req, res = response) => {
  try {
    const { codigoAdministrador, claveActual } = req.body;
    const usuario = await service.validatePassword(codigoAdministrador, claveActual);
    res.status(200).json({ ok: true, usuario });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const createUsuario = async (req, res = response) => {
  try {
    const usuario = await service.createUsuario(req.body);
    res.status(201).json({ ok: true, usuario });
  } catch (error) {
    // IMPORTANTE: Se mapea el objeto "usuario" si existe en el error, como lo indicaba tu servicio
    res.status(error.statusCode || 400).json({
      ok: false,
      msg: error.msg,
      usuario: error.usuario || null
    });
  }
};

const updateUsuario = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const usuario = await service.updateUsuario(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, usuario });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateUsuarioPassword = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuario = await service.updateUsuarioPassword(id, req.body);
    res.status(200).json({ ok: true, usuario });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteUsuario = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteUsuario(id);
    res.status(200).json({ ok: true, msg: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  validatePassword,
  createUsuario,
  updateUsuario,
  updateUsuarioPassword,
  deleteUsuario
};
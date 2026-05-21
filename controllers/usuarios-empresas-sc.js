/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const UsuariosEmpresasSCService = require("../services/usuarios-empresas-sc.service");
const service = new UsuariosEmpresasSCService();

const getUsuariosEmpresas = async (req, res = response) => {
  try {
    const usuariosEmpresas = await service.getUsuariosEmpresas();
    res.status(200).json({ ok: true, usuariosEmpresas });
  } catch (error) {
    console.log('error', error);
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getUsuarioEmpresaById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioEmpresa = await service.getUsuarioEmpresaById(id);
    res.status(200).json({ ok: true, usuarioEmpresa });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createUsuarioEmpresa = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const usuarioEmpresa = await service.createUsuarioEmpresa({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, usuarioEmpresa });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateUsuarioEmpresa = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const usuarioEmpresa = await service.updateUsuarioEmpresa(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, usuarioEmpresa });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteUsuarioEmpresa = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteUsuarioEmpresa(id);
    res.status(200).json({ ok: true, msg: "Relación eliminada correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getUsuariosEmpresas,
  getUsuarioEmpresaById,
  createUsuarioEmpresa,
  updateUsuarioEmpresa,
  deleteUsuarioEmpresa
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const RolesService = require("../services/roles.service");
const service = new RolesService();

const getRoles = async (req, res = response) => {
  try {
    const roles = await service.getRoles();
    res.status(200).json({ ok: true, roles });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getRoleById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const role = await service.getRoleById(id);
    res.status(200).json({ ok: true, role });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const getRolesByApp = async (req, res = response) => {
  try {
    const { appCode } = req.params;
    const roles = await service.getRolesByAppCode(appCode);
    res.status(200).json({ ok: true, roles });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const createRole = async (req, res = response) => {
  try {
    const usuarioAccion = req.usuario?.codigoUsuario;
    const role = await service.createRole({ ...req.body, usuarioAccion });
    res.status(201).json({ ok: true, role });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateRole = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioAccion = req.usuario?.codigoUsuario;
    const role = await service.updateRole(id, req.body, usuarioAccion);
    res.status(200).json({ ok: true, role });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteRole = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteRole(id);
    res.status(200).json({ ok: true, msg: "Rol eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getRoles,
  getRoleById,
  getRolesByApp,
  createRole,
  updateRole,
  deleteRole
};
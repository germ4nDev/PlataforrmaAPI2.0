/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const UsuariosRolesService = require("../services/usuarios-roles.service");
const service = new UsuariosRolesService();

const getUsuariosRoles = async (req, res = response) => {
  try {
    const usuariosRoles = await service.getUsuariosRoles();
    console.log('usuariosRoles', usuariosRoles);

    res.status(200).json({ ok: true, usuariosRoles });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getUsuarioRoleById = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuarioRole = await service.getUsuarioRoleById(id);
    res.status(200).json({ ok: true, usuarioRole });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const getUsuariosByRoleCode = async (req, res = response) => {
  try {
    const { codigoRole } = req.params;
    const usuariosRoles = await service.getUsuariosByRoleCode(codigoRole);
    res.status(200).json({ ok: true, usuariosRoles });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const getRolesByUser = async (req, res = response) => {
  try {
    const { codigoUsuarioSC } = req.params;
    const usuariosRoles = await service.getRolesByUserId(codigoUsuarioSC);
    res.status(200).json({ ok: true, usuariosRoles });
  } catch (error) {
    res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
  }
};

const createUsuarioRole = async (req, res = response) => {
  try {
    const usuarioRole = await service.createUsuarioRole(req.body);
    res.status(201).json({ ok: true, usuarioRole });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const syncRoleUsers = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { datosRol, usuariosSeleccionados } = req.body;
    datosRol.usuarioModificacion = req.usuario?.codigoUsuario;

    const usuarioRole = await service.updateRoleAndUsers(id, datosRol, usuariosSeleccionados);
    res.status(200).json({ ok: true, usuarioRole });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const syncUserRoles = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { datosUsuario, rolesSeleccionados } = req.body;
    datosUsuario.codigoUsuarioModificacion = req.usuario?.codigoUsuario;

    const usuariosRoles = await service.updateUserAndRoles(id, datosUsuario, rolesSeleccionados);
    res.status(200).json({ ok: true, usuariosRoles });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const deleteUsuarioRole = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteUsuarioRole(id);
    res.status(200).json({ ok: true, msg: "Relación eliminada" });
  } catch (error) {
    res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteAllUsersByRole = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteAllUsersByRole(id);
    res.status(200).json({ ok: true, msg: "Usuarios removidos del rol exitosamente" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

const deleteAllRolesByUser = async (req, res = response) => {
  try {
    const { id } = req.params;
    await service.deleteAllRolesByUser(id);
    res.status(200).json({ ok: true, msg: "Roles removidos del usuario exitosamente" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getUsuariosRoles,
  getUsuarioRoleById,
  getUsuariosByRoleCode,
  getRolesByUser,
  createUsuarioRole,
  syncRoleUsers,
  syncUserRoles,
  deleteUsuarioRole,
  deleteAllUsersByRole,
  deleteAllRolesByUser
};
/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuarioRoleAP = require('../models/usuario-role')(sequelize);

// Obtener todos los roles
const getUsuariosRoles = async (req, res) => {
  try {
    const roles = await PTLUsuarioRoleAP.findAll();
    return res.status(201).json({
      ok: true,
      usuariosRoles: roles,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener UsuariosRoles' });
  }
};

const getUsuariosRolesById = async (req, res) => {
    try {
    const usuarioRolId = req.params.id;
    const usuarioRole = await PTLUsuarioRoleAP.findOne({
      where: {
        usuarioRolId: usuarioRolId,
      },
    });
    if (!usuarioRole) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuarioRole por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      usuarioRole: usuarioRole,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarioRole" });
  }
};

const createUsuarioRole = async (req, res = response) => {
  try {
    const usurioRole = req.body;
    const nuevo = await PTLUsuarioRoleAP.create(usurioRole);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario role' });
  }
};

const updateUsuarioRole = async (req, res = response) => {
  try {
    const { usuarioRolId, ...data } = req.body;
    const usuarioRoleDB = await PTLUsuarioRoleAP.find(usuarioRolId);
    if (!usuarioRoleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuarioRole por ese id",
      });
    }
    await PTLUsuarioRoleAP.update(data, {
      where: { usuarioRolId }
    });
    const usuarioActualizado = await PTLUsuarioRoleAP.findOne({ where: { usuarioRolId } });
    return res.status(200).json({
      ok: true,
      usuarioRole: usuarioActualizado
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario role' });
  }
};

const deleteUsuarioRole = async (req, res = response) => {
  try {
    const usuarioRolId = req.params.id;
    const usuarioRoleDB = await PTLUsuarioRoleAP.findOne(usuarioRolId);
    if (!usuarioRoleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    usuarioRoleDBEliminado = await PTLUsuarioRoleAP.destroy({
      where: { usuarioRolId }
    });
    return res.status(201).json({
      ok: true,
      usuarioRole: usuarioRoleDBEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario role' });
  }
};

module.exports = {
  getUsuariosRoles,
  getUsuariosRolesById,
  createUsuarioRole,
  updateUsuarioRole,
  deleteUsuarioRole,
};

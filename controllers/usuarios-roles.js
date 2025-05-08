/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuarioRoles = require('../models/usuario-role')(sequelize);

// Obtener todos los usuariosRoles
const getUsuariosRoles = async (req, res) => {
  try {
    const roles = await PTLUsuarioRoles.findAll();
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
    const { usuarioRoleId } = req.body;
    const role = await PTLUsuarioRoles.findById(usuarioRoleId);
    if (!role) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuarioRole con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      usuarioRole: role,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

// Crear un nuevo usuarioRole
const createUsuarioRole = async (req, res = response) => {
  try {
    const { usuarioId, rolId } = req.body;
    const nuevo = await PTLUsuarioRoles.create({ usuarioId, rolId });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario role' });
  }
};

// Actualizar un usuarioRole
const updateUsuarioRole = async (req, res = response) => {
  try {
    const { usuarioRoleId, usuarioId, rolId } = req.body;
    const UsuarioRole = req.body;
    const usuarioRoleDB = await PTLUsuarioRoles.find(usuarioRoleId);
    if (!usuarioRoleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuarioRole con ese id",
      });
    }
    const usuarioRoleDBActualizado = await PTLUsuarioRoles.findByIdAndUpdate({ usuarioRoleId, UsuarioRole });
    return res.status(201).json({
      ok: true,
      usuarioRole: usuarioRoleDBActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario role' });
  }
};

// Borrar un usuarioRole
const deleteUsuarioRole = async (req, res = response) => {
  try {
    const { usuarioRoleId } = req.body;
    const usuarioRoleDB = await PTLUsuarioRoles.findOne(usuarioRoleId);
    if (!usuarioRoleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuarioRole con ese id",
      });
    }
    const usuarioRoleDBEliminado = await PTLUsuarioRoles.findByIdAndDelete({ usuarioRoleId });
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

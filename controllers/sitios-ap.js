/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSitiosAP = require('../models/sitio-ap')(sequelize);

// Obtener todos los sitios
const getSitios = async (req, res) => {
  try {
    const sitios = await PTLSitiosAP.findAll();
    return res.status(201).json({
      ok: true,
      sitios: sitios,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los sitios' });
  }
};

const getUsuariosRolesById = async (req, res) => {
  try {
    const { usuarioRolId } = req.body;
    const role = await PTLUsuarioRoleAP.findById(usuarioRolId);
    if (!role) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuarioRole por ese id",
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

// Crear un nuevo rol
const createUsuarioRole = async (req, res = response) => {
  try {
    const { usuarioId, rolId } = req.body;
    const nuevo = await PTLUsuarioRoleAP.create({ usuarioId, rolId });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario role' });
  }
};

// Actualizar un nuevo rol
const updateUsuarioRole = async (req, res = response) => {
  try {
    const { usuarioRolId, usuarioId, rolId } = req.body;
    const UsusarioRole = req.body;
    const usuarioRoleDB = await PTLUsuarioRoleAP.find(usuarioRolId);
    if (!usuarioRoleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    const usuarioRoleDBActualizado = await PTLUsuarioRoleAP.findByIdAndUpdate({ usuarioRolId, UsusarioRole });
    return res.status(201).json({
      ok: true,
      usuarioRole: usuarioRoleDBActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario role' });
  }
};

// Borrar un nuevo rol
const deleteUsuarioRole = async (req, res = response) => {
  try {
    const { usuarioRolId } = req.body;
    const usuarioRoleDB = await PTLUsuarioRoleAP.findOne(usuarioRolId);
    if (!usuarioRoleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    const usuarioRoleDBEliminado = await PTLUsuarioRoleAP.findByIdAndDelete({ usuarioRolId });
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

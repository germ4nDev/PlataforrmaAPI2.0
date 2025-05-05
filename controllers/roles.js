/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLRolesAP = require('../models/role')(sequelize);

// Obtener todos los rols
const getRolesAP = async (req, res) => {
  try {
    const rols = await PTLRolesAP.findAll();
    return res.status(201).json({
      ok: true,
      rols: rols,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener RolesAP' });
  }
};

const getRoleAPById = async (req, res) => {
  try {
    const { roleId } = req.body;
    const role = await PTLRolesAP.findById(roleId);
    if (!role) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un role por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      role: role,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener rols' });
  }
};

// Crear un nuevo role
const createRoleAP = async (req, res = response) => {
  try {
    const role = req.body;
    const nuevo = await PTLRolesAP.create(role);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el role' });
  }
};

// Actualizar un nuevo role
const updateRoleAP = async (req, res = response) => {
  try {
    const { roleId } = req.body;
    const role = req.body;
    const roleOg = await PTLRolesAP.find(roleId);
    if (!roleOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un role por ese id",
      });
    }
    const roleActualizado = await PTLRolesAP.findByIdAndUpdate({ roleId, role });
    return res.status(201).json({
      ok: true,
      role: roleActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el role' });
  }
};

// Borrar un nuevo role
const deleteRoleAP = async (req, res = response) => {
  try {
    const { roleId } = req.body;
    const role = await PTLRolesAP.findOne(roleId);
    if (!role) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un role por ese id",
      });
    }
    const roleEliminado = await PTLRolesAP.findByIdAndDelete({ roleId });
    return res.status(201).json({
      ok: true,
      role: roleEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar role' });
  }
};

module.exports = {
  getRolesAP,
  getRoleAPById,
  createRoleAP,
  updateRoleAP,
  deleteRoleAP,
};
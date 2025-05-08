/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLRolesAP = require('../models/role-ap')(sequelize);

// Obtener todos los role
const getRoles = async (req, res) => {
  try {
    const role = await PTLRolesAP.findAll();
    return res.status(201).json({
      ok: true,
      role: role,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener RolesAP' });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { roleId } = req.body;
    const role = await PTLRolesAP.findById(roleId);
    if (!role) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un role con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      role: role,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener role' });
  }
};

// Crear un nuevo role
const createRole = async (req, res = response) => {
  try {
    const role = req.body;
    const nuevo = await PTLRolesAP.create(role);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el role' });
  }
};

// Actualizar un role
const updateRole = async (req, res = response) => {
  try {
    const { roleId } = req.body;
    const role = req.body;
    const roleOg = await PTLRolesAP.find(roleId);
    if (!roleOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un role con ese id",
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

// Borrar un role
const deleteRole = async (req, res = response) => {
  try {
    const { roleId } = req.body;
    const role = await PTLRolesAP.findOne(roleId);
    if (!role) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un role con ese id",
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
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
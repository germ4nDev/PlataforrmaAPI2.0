/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLRolesAP = require('../models/role')(sequelize);
const { io } = require('../index');

const getRolesAP = async (req, res) => {
  try {
    const roles = await PTLRolesAP.findAll();
    return res.status(201).json({
      ok: true,
      roles,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Roles' });
  }
};

const getRoleAPById = async (req, res) => {
  try {
    const codigoRole = req.params.id;
    const role = await PTLRolesAP.findOne({
      where: {
        codigoRole: codigoRole,
      },
    });
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
    res.status(500).json({ error: "Error al obtener role" });
  }
};

const createRoleAP = async (req, res = response) => {
  const { ...newRegistro } = req.body;
  console.log('data role', newRegistro);
  
  try {
    const roleDB = await PTLRolesAP.create(newRegistro);
    io.emit('roles-actualizados', {
      action: 'create',
      msg: `Role creado: ${roleDB.nombreRole}`
    });
    return res.status(201).json({
      ok: true,
      role: roleDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el role'
    });
  }
};

const updateRoleAP = async (req, res = response) => {
  const { codigoRole, ...data } = req.body;
  try {
    const roleDB = await PTLRolesAP.findOne({
      where: { codigoRole }
    });
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un role con ese ID'
      });
    }
    await PTLRolesAP.update(data, {
      where: { codigoRole }
    });
    const roleActualizado = await PTLRolesAP.findOne({ where: { codigoRole } });
    io.emit('roles-actualizados', {
      action: 'update',
      msg: `Role actualizado: ${roleActualizado.nombreRole}`
    });
    return res.status(200).json({
      ok: true,
      role: roleActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el role'
    });
  }
};

const deleteRoleAP = async (req, res = response) => {
  try {
    const codigoRole = req.params.id;
    const roleDB = await PTLRolesAP.findOne({
      where: { codigoRole }
    });
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un role con ese ID'
      });
    }
    roleEliminado = await PTLRolesAP.destroy({
      where: { codigoRole }
    });
    io.emit('roles-actualizados', {
      action: 'delete',
      msg: `Role emiminado: ${roleEliminado.nombreRole}`
    });
    return res.status(200).json({
      ok: true,
      role: roleEliminado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el usuario'
    });
  }
};

module.exports = {
  getRolesAP,
  getRoleAPById,
  createRoleAP,
  updateRoleAP,
  deleteRoleAP,
};
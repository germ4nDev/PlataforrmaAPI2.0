/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLRolesAP = require('../models/role')(sequelize);

const getRolesAP = async (req, res) => {
  try {
    const roles = await PTLRolesAP.findAll();
    return res.status(201).json({
      ok: true,
      roles: roles,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Roles' });
  }
};

const getRoleAPById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await PTLRolesAP.findOne({
      where: {
        roleId: roleId,
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
  try {
    const nuevoRole = req.body;
    const roleDB = await PTLRolesAP.create(nuevoRole);
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
  try {
    const { roleId, ...data } = req.body;
    const roleDB = await PTLRolesAP.findOne({
      where: { roleId }
    });
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un role con ese ID'
      });
    }
    await PTLRolesAP.update(data, {
      where: { roleId }
    });
    const roleActualizado = await PTLRolesAP.findOne({ where: { roleId } });
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
    const rolId = req.params.id;
    const roleDB = await PTLAplicaciones.findOne({
      where: { rolId }
    });
    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un role con ese ID'
      });
    }
    roleEliminado = await PTLRolesAP.destroy({
      where: { rolId }
    });

    return res.status(200).json({
      ok: true,
      usuario: roleEliminado,
      msg: 'Role eliminado correctamente'
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
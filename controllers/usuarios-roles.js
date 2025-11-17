/*
    Author: German Valencia
*/
const express = require("express");
const sequelize = require("../database/connection");
const PTLUsuarioRoleAP = require("../models/usuario-role")(sequelize);
const { io } = require("../index");

// Obtener todos los roles
const getUsuariosRoles = async (req, res) => {
  try {
    const usuariosRoles = await PTLUsuarioRoleAP.findAll();
    console.log("usuarios roles", usuariosRoles);
    return res.status(201).json({
      ok: true,
      usuariosRoles: usuariosRoles,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener UsuariosRoles" });
  }
};

const getUsuariosRolesById = async (req, res) => {
  try {
    const usuarioRoleId = req.params.id;
    const usuarioRole = await PTLUsuarioRoleAP.findOne({
      where: {
        usuarioRoleId: usuarioRoleId,
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
  const { ...newRegistro } = req.body;
  try {
    const nuevo = await PTLUsuarioRoleAP.create(newRegistro);
    io.emit("usuarios-roles-actualizados", {
      action: "create",
      msg: `Usuario Role creado`,
    });
    return res.status(201).json({
      ok: true,
      usuarioRole: nuevo,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el usuario role" });
  }
};

const updateUsuarioRole = async (req, res = response) => {
  const { usuarioRoleId, ...data } = req.body;
  try {
    const usuarioRoleDB = await PTLUsuarioRoleAP.findOne({
      where: { usuarioRoleId },
    });
    if (!usuarioRoleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuarioRole con ese ID",
      });
    }
    await PTLUsuarioRoleAP.update(data, {
      where: { usuarioRoleId },
    });
    const usuarioRoleActualizado = await PTLUsuarioRoleAP.findOne({
      where: { usuarioRoleId },
    });
    io.emit("usuarios-roles-actualizados", {
      action: "update",
      msg: `Usuario Role actualizado`,
    });
    return res.status(200).json({
      ok: true,
      usuarioRole: usuarioRoleActualizado,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al actualizar el usuarioRole",
    });
  }
};

const deleteUsuarioRole = async (req, res = response) => {
  try {
    const usuarioRoleId = req.params.id;
    const usuarioRoleDB = await PTLUsuarioRoleAP.findOne({
      where: { usuarioRoleId },
    });
    if (!usuarioRoleDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    console.log("eliminar el registro", usuarioRoleDB);
    usuarioRoleDBEliminado = await PTLUsuarioRoleAP.destroy({
      where: { usuarioRoleId },
    });
    io.emit("usuarios-roles-actualizados", {
      action: "delete",
      msg: `Usuario Role eliminado`,
    });
    return res.status(201).json({
      ok: true,
      usuarioRole: usuarioRoleDBEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar usuario role" });
  }
};

const deleteTodosUsuarioRole = async (req, res = response) => {
  try {
    const usuarioId = Number(req.params.usId);
    const aplicacionId = Number(req.params.apId);
    const suiteId = Number(req.params.suId);
    console.log("Parametros recibidos:", { usuarioId, aplicacionId, suiteId });

    const usuarioRolesDB = await PTLUsuarioRoleAP.findAll({
      where: { usuarioId, aplicacionId, suiteId },
    });

    console.log("usuarioRolesDB", usuarioRolesDB);
    if (usuarioRolesDB.length > 0) {
      for (const usuRole of usuarioRolesDB) {
        console.log("Eliminando:", usuRole.usuarioRoleId);
        await PTLUsuarioRoleAP.destroy({
          where: { usuarioRoleId: usuRole.usuarioRoleId },
        });
      }
      return res.status(201).json({
        ok: true,
        usuarioRole: "Todos Eliminados",
      });
    } else {
      return res.status(200).json({
        ok: false,
        usuarioRole: "No hay roles",
      });
    }
  } catch (err) {
    console.error("Error al eliminar usuario role", err);
    return res.status(500).json({ error: "Error al eliminar usuario role" });
  }
};

module.exports = {
  getUsuariosRoles,
  getUsuariosRolesById,
  createUsuarioRole,
  updateUsuarioRole,
  deleteUsuarioRole,
  deleteTodosUsuarioRole,
};

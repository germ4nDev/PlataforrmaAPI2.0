/*
    Author: German Valencia
    Actualizado: German Valiencia 20251026
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuarios = require('../models/usuario')(sequelize);
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const { io } = require('../index');

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await PTLUsuarios.findAll();
    return res.status(201).json({
      ok: true,
      usuarios: usuarios,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Usuarios' });
  }
};

const getUsuariosById = async (req, res) => {
  try {
    const codigoUsuario = req.params.id;
    const usuario = await PTLUsuarios.findOne({
      where: {
        codigoUsuario: codigoUsuario,
      },
    });
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      usuario: usuario,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener aplicacion" });
  }
};

const createUsuario = async (req, res = response) => {
    const { ...newRegistro } = req.body;
  try {
    const existeIdentificacion = await PTLUsuarios.findOne({
      where: { nombreUsuario: newRegistro.identificacionUsuario }
    });
    if (existeIdentificacion) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con esa identificación'
      });
    }
    const existeNombre = await PTLUsuarios.findOne({
      where: { nombreUsuario: newRegistro.nombreUsuario }
    });
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese nombre'
      });
    }
    const salt = bcrypt.genSaltSync();
    const password = await bcrypt.hash(newRegistro.claveUsuario, salt);
    newRegistro.claveUsuario = password;
    newRegistro.fotoUsuario = 'no-foto.png';
    const usuarioDB = await PTLUsuarios.create(newRegistro);
    io.emit("usuarios-actualizados", {
      action: "create",
      msg: `Usuario creado: ${usuarioDB.nombreUsuario}`,
    });
    return res.status(201).json({
      ok: true,
      usuario: usuarioDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el usuario'
    });
  }
};

const updateUsuario = async (req, res = response) => {
    const { codigoUsuario, ...data } = req.body;
  try {
    const usuarioDB = await PTLUsuarios.findOne({
      where: { codigoUsuario }
    });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese ID'
      });
    }
    await PTLUsuarios.update(data, {
      where: { codigoUsuario }
    });
    const usuarioActualizado = await PTLUsuarios.findOne({ where: { codigoUsuario } });
    io.emit("usuarios-actualizados", {
      action: "update",
      msg: `Usuario actualizado: ${usuarioActualizado.nombreUsuario}`,
    });
    return res.status(200).json({
      ok: true,
      usuario: usuarioActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el usuario'
    });
  }
};

const updateUsuarioClave = async (req, res = response) => {
    const { codigoUsuario, ...data } = req.body;
  try {
    const usuarioDB = await PTLUsuarios.findOne({
      where: { codigoUsuario }
    });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese ID'
      });
    }
    const salt = bcrypt.genSaltSync();
    const password = await bcrypt.hash(nuevoUsuario.claveUsuario, salt);
    nuevoUsuario.claveUsuario = password;
    await PTLUsuarios.update(data, {
      where: { codigoUsuario }
    });
    const usuarioActualizado = await PTLUsuarios.findOne({ where: { codigoUsuario } });
    io.emit("usuarios-actualizados", {
      action: "update",
      msg: `Usuario Clave actualizado: ${usuarioActualizado.nombreUsuario}`,
    });
    return res.status(200).json({
      ok: true,
      usuario: usuarioActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el usuario'
    });
  }
};

const deleteUsuario = async (req, res = response) => {
  try {
    const codigoUsuario = req.params.id;
    const usuarioDB = await PTLUsuarios.findOne({
      where: { codigoUsuario }
    });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una aplicación con ese ID'
      });
    }
    usuarioEliminado = await PTLUsuarios.destroy({
      where: { codigoUsuario }
    });
    io.emit("usuarios-actualizados", {
      action: "delete",
      msg: `Usuario eliminado: ${usuarioEliminado.nombreUsuario}`,
    });
    return res.status(200).json({
      ok: true,
      usuario: usuarioEliminado,
      msg: 'Usuario eliminado correctamente'
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
  getUsuarios,
  getUsuariosById,
  createUsuario,
  updateUsuario,
  updateUsuarioClave,
  deleteUsuario,
};

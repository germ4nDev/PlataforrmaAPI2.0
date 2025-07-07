/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuarios = require('../models/usuario')(sequelize);
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");

// Obtener todos los roles
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
    const usuarioId = req.params.id;
    const usuario = await PTLUsuarios.findOne({
      where: {
        usuarioId: usuarioId,
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
  try {
    const nuevoUsuario = req.body;
    const existeIdentificacion = await PTLUsuarios.findOne({
      where: { nombreUsuario: nuevoUsuario.identificacionUsuario }
    });
    if (existeIdentificacion) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con esa identificación'
      });
    }
    const existeNombre = await PTLUsuarios.findOne({
      where: { nombreUsuario: nuevoUsuario.nombreUsuario }
    });
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese nombre'
      });
    }
    const salt = bcrypt.genSaltSync();
    const password = await bcrypt.hash(nuevoUsuario.claveUsuario, salt);
    nuevoUsuario.claveUsuario = password;
    nuevoUsuario.fotoUsuario = 'no-foto.png';
    const usuarioDB = await PTLUsuarios.create(nuevoUsuario);
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
  try {
    const { usuarioId, ...data } = req.body;
    const usuarioDB = await PTLUsuarios.findOne({
      where: { usuarioId }
    });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese ID'
      });
    }
    await PTLUsuarios.update(data, {
      where: { usuarioId }
    });
    const usuarioActualizado = await PTLUsuarios.findOne({ where: { usuarioId } });
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
    const usuarioId = req.params.id;
    const usuarioDB = await PTLUsuarios.findOne({
      where: { usuarioId }
    });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una aplicación con ese ID'
      });
    }
    usuarioEliminado = await PTLUsuarios.destroy({
      where: { usuarioId }
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
  deleteUsuario,
};

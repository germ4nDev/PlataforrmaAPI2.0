/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuarios = require('../models/usuario')(sequelize);

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await PTLUsuarios.findAll();
    return res.status(201).json({
      ok: true,
      usuarios: usuarios,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los Usuarios' });
  }
};

const getUsuariosById = async (req, res) => {
  try {
    const { usuarioId } = req.body;
    const usuario = await PTLUsuarios.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      usuario: usuario,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res = response) => {
  try {
    const usuario = req.body;
    const nuevo = await PTLUsuarios.create(usuario);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar un usuario
const updateUsuario = async (req, res = response) => {
  try {
    const { usuarioId } = req.body;
    const Ususario = req.body;
    const usuarioDB = await PTLUsuarios.find(usuarioId);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }
    const usuarioActualizado = await PTLUsuarios.findByIdAndUpdate({ usuarioId, Ususario });
    return res.status(201).json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Borrar un usuario
const deleteUsuario = async (req, res = response) => {
  try {
    const { usuarioId } = req.body;
    const usuarioDB = await PTLUsuarios.findOne(usuarioId);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }
    const usuarioEliminado = await PTLUsuarios.findByIdAndDelete({ usuarioId });
    return res.status(201).json({
      ok: true,
      usuario: usuarioEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

module.exports = {
  getUsuarios,
  getUsuariosById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};

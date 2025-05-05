/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuariosSC = require('../models/usuarios-sc')(sequelize);

// Obtener todos los usuasrios ST
const getUsuariosST = async (req, res) => {
  try {
    const usuarios = await PTLUsuariosSC.findAll();
    return res.status(201).json({
      ok: true,
      usuarios: usuarios,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Usuarios' });
  }
};

const getUsuariosSTById = async (req, res) => {
  try {
    const { usuarioId } = req.body;
    const usuario = await PTLUsuariosSC.findById(usuarioId);
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
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Crear un nuevo usuairo ST
const createUsuarioST = async (req, res = response) => {
  try {
    const usuario = req.body;
    const nuevo = await PTLUsuariosSC.create(usuario);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar un nuevo usuario ST
const updateUsuarioST = async (req, res = response) => {
  try {
    const { usuarioSTId } = req.body;
    const Ususario = req.body;
    const usuarioDB = await PTLUsuariosSC.find(usuarioSTId);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    const usuarioActualizado = await PTLUsuariosSC.findByIdAndUpdate({ usuarioId, Ususario });
    return res.status(201).json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Borrar un usuasrio ST
const deleteUsuarioST = async (req, res = response) => {
  try {
    const { usuarioSTId } = req.body;
    const usuarioDB = await PTLUsuariosSC.findOne(usuarioSTId);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    const usuarioEliminado = await PTLUsuariosSC.findByIdAndDelete({ usuarioSTId });
    return res.status(201).json({
      ok: true,
      usuario: usuarioEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

module.exports = {
  getUsuariosST,
  getUsuariosSTById,
  createUsuarioST,
  updateUsuarioST,
  deleteUsuarioST,
};
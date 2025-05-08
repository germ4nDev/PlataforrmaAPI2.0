/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuariosSC = require('../models/usuario-sc')(sequelize);

// Obtener todos los usuarios SC
const getUsuariosSC = async (req, res) => {
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

const getUsuariosSCById = async (req, res) => {
  try {
    const { usuarioId } = req.body;
    const usuario = await PTLUsuariosSC.findById(usuarioId);
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

// Crear un nuevo usuairo SC
const createUsuarioSC = async (req, res = response) => {
  try {
    const usuario = req.body;
    const nuevo = await PTLUsuariosSC.create(usuario);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar un usuario SC
const updateUsuarioSC = async (req, res = response) => {
  try {
    const { usuarioSCId } = req.body;
    const Ususario = req.body;
    const usuarioDB = await PTLUsuariosSC.find(usuarioSCId);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
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

// Borrar un usuario SC
const deleteUsuarioSC = async (req, res = response) => {
  try {
    const { usuarioSCId } = req.body;
    const usuarioDB = await PTLUsuariosSC.findOne(usuarioSCId);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }
    const usuarioEliminado = await PTLUsuariosSC.findByIdAndDelete({ usuarioSCId });
    return res.status(201).json({
      ok: true,
      usuario: usuarioEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

module.exports = {
  getUsuariosSC,
  getUsuariosSCById,
  createUsuarioSC,
  updateUsuarioSC,
  deleteUsuarioSC,
};
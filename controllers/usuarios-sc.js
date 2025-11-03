/*
    Author: German Valencia
    Actualizado: German Valiencia 20251026
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuariosSC = require('../models/usuario-sc')(sequelize);

const getUsuariosSC = async (req, res) => {
  try {
    const usuariosSC = await PTLUsuariosSC.findAll();
    return res.status(201).json({
      ok: true,
      usuariosSC: usuariosSC,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Usuarios' });
  }
};

const getUsuariosSCById = async (req, res) => {
  try {
    const { codigoUsuarioSC } = req.body;
    const usuarioSC = await PTLUsuariosSC.findById(codigoUsuarioSC);
    if (!usuarioSC) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      usuarioSC: usuarioSC,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const createUsuarioSC = async (req, res = response) => {
  try {
    const { ...newRegistro } = req.body;
    const nuevo = await PTLUsuariosSC.create(newRegistro);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuarioSC' });
  }
};

const updateUsuarioSC = async (req, res = response) => {
  try {
    const { codigoUsuarioSC, ...data } = req.body;
    const usuarioDB = await PTLUsuariosSC.find(codigoUsuarioSC);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    const usuarioActualizado = await PTLUsuariosSC.findByIdAndUpdate({ codigoUsuarioSC, Ususario });
    return res.status(201).json({
      ok: true,
      usuarioSC: usuarioActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const deleteUsuarioSC = async (req, res = response) => {
  try {
    const { codigoUsuarioSC } = req.body;
    const usuarioDB = await PTLUsuariosSC.findOne(codigoUsuarioSC);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    const usuarioEliminado = await PTLUsuariosSC.findByIdAndDelete({ codigoUsuarioSC });
    return res.status(201).json({
      ok: true,
      usuarioSC: usuarioEliminado,
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
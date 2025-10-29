/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuariosEmpresasSC = require('../models/usuario-sc')(sequelize);

// Obtener todos los usuariosEmpresas
const getUsuariosEmpresas = async (req, res) => {
  try {
    const usuariosEmpresas = await PTLUsuariosEmpresasSC.findAll();
    return res.status(201).json({
      ok: true,
      usuariosEmpresas: usuariosEmpresas,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener UsuariosEmpresas' });
  }
};

const getUsuariosEmpresasById = async (req, res) => {
  try {
    const { usuarioEmpresaId } = req.body;
    const usurioEmpresa = await PTLUsuariosEmpresasSC.findById(usuarioEmpresaId);
    if (!usurioEmpresa) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuarioEmpresa por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      usuarioEmpresa: usurioEmpresa,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuariosEmpresas' });
  }
};

// Crear un nuevo rol
const createUsuarioEmpresa = async (req, res = response) => {
  try {
    const usuarioEmpresa = req.body;
    const nuevo = await PTLUsuariosEmpresasSC.create(usuarioEmpresa);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usurioEmpresa' });
  }
};

// Actualizar un nuevo rol
const updateUsuarioEmpresa = async (req, res = response) => {
  try {
    const usuarioEmpresaId = req.body.usuarioEmpresId;
    const UsusarioEmpresa = req.body;
    const usuarioEmpresaDB = await PTLUsuariosEmpresasSC.find(usuarioEmpresaId);
    if (!usuarioEmpresaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuarioEmpresa por ese id",
      });
    }
    const usuarioEmpresaDBActualizado = await PTLUsuariosEmpresasSC.findByIdAndUpdate({ usuarioEmpresaId, UsusarioEmpresa });
    return res.status(201).json({
      ok: true,
      usuarioEmpresa: usuarioEmpresaDBActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usurioEmpresa' });
  }
};

// Borrar un nuevo rol
const deleteUsuarioEmpresa = async (req, res = response) => {
  try {
    const { usuarioEmpresaId } = req.body;
    const usuarioEmpresaDB = await PTLUsuariosEmpresasSC.findOne(usuarioEmpresaId);
    if (!usuarioEmpresaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    const usuarioEmpresaDBEliminado = await PTLUsuariosEmpresasSC.findByIdAndDelete({ usuarioEmpresaId });
    return res.status(201).json({
      ok: true,
      usuarioEmpresa: usuarioEmpresaDBEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario usurioEmpresa' });
  }
};

module.exports = {
  getUsuariosEmpresas,
  getUsuariosEmpresasById,
  createUsuarioEmpresa,
  updateUsuarioEmpresa,
  deleteUsuarioEmpresa,
};

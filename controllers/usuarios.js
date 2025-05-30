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
    console.log('acuya');
    
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
    const { usuarioId } = req.body;
    const usuario = await PTLUsuarios.findById(usuarioId);
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

// Crear un nuevo usuario
const createUsuario = async (req, res = response) => {
  try {
    const usuario = req.body;
    const emailDev = usuario.email;
    const existeEmail = await PTLUsuarios.findOne({ 
        where: {
          correoUsuario: emailDev
        } 
     });
    if (existeEmail) {
      return res.json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    } else {
      const salt = bcrypt.genSaltSync();
      usuario.claveUsuario = bcrypt.hashSync(usuario.claveUsuario, salt);
      const nuevo = await PTLUsuarios.create(usuario);
      const token = await generarJWT(nuevo.usuarioId, nuevo.userNameUsuario, nuevo.correoUsuario);
      res.json({
        ok: true,
        usuario : nuevo,
        token : token
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar un nuevo rol
const updateUsuario = async (req, res = response) => {
  try {
    const { usuarioId } = req.body;
    const Usuario = req.body;
    const usuarioDB = await PTLUsuarios.find(usuarioId);
    if (!usuarioDB) {
      return res.json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    } else {
      if (usuario.claveUsuario = '') {
        usuario.claveUsuario = usuarioDB.claveUsuario;
      }
      const usuarioActualizado = await PTLUsuarios.findByIdAndUpdate({ usuarioId, Usuario });
      return res.status(201).json({
        ok: true,
        usuario: usuarioActualizado,
      });      
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Borrar un nuevo rol
const deleteUsuario = async (req, res = response) => {
  try {
    const { usuarioId } = req.body;
    const usuarioDB = await PTLUsuarios.findOne(usuarioId);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
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

/*
    Author: German Valencia
*/
// const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const sequelize = require('../database/connection');
const PTLUsuarios = require('../models/usuario')(sequelize);

const login = async (req, res = response) => {
    console.log('login Usuario', req.body);
    const dataUser = req.body;
    try {
      const usuarioDB = await PTLUsuarios.findOne({ 
        where: {
          userNameUsuario: dataUser.username
        } 
      });
      if (!usuarioDB) {
        res.json({
          ok: false,
          msg: "UserName no encontrado",
        });
      } else {
        console.log('Usuario Encontrado', usuarioDB);

        const salt = bcrypt.genSaltSync();
        const password = await bcrypt.hash(dataUser.password, salt);
        console.log('password digitado', password);

        const isMatch = await bcrypt.compare(dataUser.password, usuarioDB.claveUsuario);

        if (isMatch) {
          console.log('✅ Login exitoso');
          const token = await generarJWT(usuarioDB.usuarioId, usuarioDB.userNameUsuario, usuarioDB.correoUsuario);
          console.log('token Usuario', token);
          res.json({
            ok: true,
            token,
            usuario: usuarioDB,
          });    
        } else {
          return res.json({
            ok: false,
            msg: "Contraseña no válida",
          });
        }       
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error de sistema, Hable con el administrador",
      });
    }
};

const verificarUserInRole = async (req, res = response) => {
  const { role, usuario } = req.body;
  const roles = usuario.roles;
  const exidRole = roles.filter((x) => x.nombre === role);
  const boolEciste = false;
  if (exidRole) {
    boolExiste = true;
  } else {
    boolExiste = false;
  }

  res.json({
    ok: true,
    isRole: boolExiste,
  });
};

const verificaarClaveActual = async (req, res = response) => {
    console.log('login Usuario', req.body);
    const dataUser = req.body;
    try {
      const usuarioDB = await PTLUsuarios.findOne({ 
        where: {
          userNameUsuario: dataUser.username
        } 
      });
      if (!usuarioDB) {
        res.json({
          ok: false,
          msg: "UserName no encontrado",
        });
      } else {
        console.log('Usuario Encontrado', usuarioDB);

        const isMatch = await bcrypt.compare(dataUser.password, usuarioDB.claveUsuario);

        if (isMatch) {
          res.json({
            ok: true,
            usuario: usuarioDB,
          });    
        } else {
          return res.json({
            ok: false,
            msg: "Contraseña no válida",
          });
        }       
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error de sistema, Hable con el administrador",
      });
    }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  // Generar el TOKEN - JWT
  const token = await generarJWT(uid);
  // Obtener el usuario por UID
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario
  });
};

module.exports = {
  login,
  renewToken,
  verificaarClaveActual,
  verificarUserInRole,
};

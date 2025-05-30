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
    const userNameUsuario = dataUser.user;
    const claveUsuario = dataUser.password;
    try {
      const usuarioDB = await PTLUsuarios.findOne({ 
        where: {
          userNameUsuario: userNameUsuario
        } 
      });
      if (!usuarioDB) {
        res.json({
          ok: false,
          msg: "UserName no encontrado",
        });
      } else {
        console.log('Usuario Encontrado', usuarioDB);

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(claveUsuario, usuarioDB.claveUsuario);
        console.log('validPassword Usuario', validPassword);
        if (!validPassword) {
          return res.json({
            ok: false,
            msg: "Contraseña no válida",
          });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.usuarioId, usuarioDB.userNameUsuario, usuarioDB.correoUsuario);
        console.log('token Usuario', token);
        // usuarioDB.serviceToken = token;
        res.json({
          ok: true,
          token,
          usuario: usuarioDB,
        });        
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
  verificarUserInRole,
};

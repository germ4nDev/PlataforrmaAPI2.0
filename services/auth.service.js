/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Auth Service
*/
const bcrypt = require("bcryptjs");
const sequelize = require('../database/connection');
const { generarJWT } = require("../helpers/jwt");
const { UsuarioModel } = require('../models/usuario');
const { io } = require('../index');

class AuthService {
  constructor() {
    this.model = UsuarioModel(sequelize);
  }

  async login(username, password) {
    const usuarioDB = await this.model.findOne({
      where: { userNameUsuario: username }
    });

    if (!usuarioDB) {
      throw { statusCode: 404, msg: "Usuario no encontrado" };
    }

    if (!usuarioDB.estadoUsuario) {
      throw { statusCode: 403, msg: "El usuario se encuentra inactivo" };
    }

    const isMatch = await bcrypt.compare(password, usuarioDB.claveUsuario);

    if (!isMatch) {
      throw { statusCode: 401, msg: "Credenciales no válidas" };
    }

    const token = await generarJWT(
      usuarioDB.codigoUsuario,
      usuarioDB.userNameUsuario,
      usuarioDB.correoUsuario
    );

    io.emit('autenticaciones-actualizadas', {
      action: 'login',
      msg: `Sesión iniciada: ${usuarioDB.userNameUsuario}`
    });

    return {
      usuario: {
        codigo: usuarioDB.codigoUsuario,
        nombre: usuarioDB.nombreUsuario,
        username: usuarioDB.userNameUsuario,
        correo: usuarioDB.correoUsuario,
        admin: usuarioDB.usuarioAdministrador
      },
      token
    };
  }

  async verificarClave(username, password) {
    const usuarioDB = await this.model.findOne({
      where: { userNameUsuario: username }
    });

    if (!usuarioDB) {
      throw { statusCode: 404, msg: "Usuario no encontrado" };
    }

    const isMatch = await bcrypt.compare(password, usuarioDB.claveUsuario);

    if (!isMatch) {
      throw { statusCode: 401, msg: "Contraseña incorrecta" };
    }

    return usuarioDB;
  }

  async renovarToken(uid) {
    const usuarioDB = await this.model.findOne({
      where: { codigoUsuario: uid } // Corrección del typo 'codigoUsuairo'
    });

    if (!usuarioDB) {
      throw { statusCode: 404, msg: "Usuario no existe" };
    }

    const token = await generarJWT(
      usuarioDB.codigoUsuario,
      usuarioDB.userNameUsuario,
      usuarioDB.correoUsuario
    );

    return { usuario: usuarioDB, token };
  }

  verificarRol(roles, roleToCheck) {
    if (!roles || !Array.isArray(roles)) return false;
    return roles.some((rol) => rol.nombre === roleToCheck);
  }
}

module.exports = AuthService;
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const sequelize = require('../database/connection');
const PTLUsuarios = require('../models/usuario')(sequelize);
const { io } = require('../index');

const login = async (username, password) => {
  const usuarioDB = await PTLUsuarios.findOne({
    where: { userNameUsuario: username }
  });

  if (!usuarioDB) {
    throw { statusCode: 404, msg: "UserName no encontrado" };
  }

  const isMatch = await bcrypt.compare(password, usuarioDB.claveUsuario);

  if (!isMatch) {
    throw { statusCode: 401, msg: "Contraseña no válida" };
  }

  const token = await generarJWT(
    usuarioDB.codigoUsuairo,
    usuarioDB.userNameUsuario,
    usuarioDB.correoUsuario
  );

  io.emit('autenticaciones-actualizadas', {
    action: 'login',
    msg: `Login exitoso: ${usuarioDB.codigoUsuairo}`
  });

  return { usuario: usuarioDB, token };
};

const verificarClave = async (username, password) => {
  const usuarioDB = await PTLUsuarios.findOne({
    where: { userNameUsuario: username }
  });

  if (!usuarioDB) {
    throw { statusCode: 404, msg: "UserName no encontrado" };
  }

  const isMatch = await bcrypt.compare(password, usuarioDB.claveUsuario);

  if (!isMatch) {
    throw { statusCode: 401, msg: "Contraseña no válida" };
  }

  return usuarioDB;
};

const renovarToken = async (uid) => {
  // Ajustado a Sequelize (antes decía Usuario.findById)
  const usuarioDB = await PTLUsuarios.findOne({
    where: { codigoUsuairo: uid }
  });

  if (!usuarioDB) {
    throw { statusCode: 404, msg: "Usuario no encontrado" };
  }

  const token = await generarJWT(uid);

  return { usuario: usuarioDB, token };
};

const verificarRol = (roles, roleToCheck) => {
  if (!roles || !Array.isArray(roles)) return false;
  // .some() devuelve true si encuentra al menos un elemento que cumpla la condición
  return roles.some((rol) => rol.nombre === roleToCheck);
};

module.exports = {
  login,
  verificarClave,
  renovarToken,
  verificarRol
};
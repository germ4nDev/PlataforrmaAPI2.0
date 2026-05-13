const sequelize = require('../database/connection');
const PTLUsuarios = require('../models/usuario')(sequelize);
const bcrypt = require("bcryptjs");
const { io } = require('../index');

const obtenerUsuarios = async () => {
  return await PTLUsuarios.findAll();
};

const obtenerUsuarioPorId = async (codigoUsuario) => {
  const usuario = await PTLUsuarios.findOne({
    where: { codigoUsuario },
  });

  if (!usuario) {
    throw { statusCode: 404, msg: "ERROREXISTEID" };
  }

  return usuario;
};

const validarPassword = async (codigoAdministrador, claveActual) => {
  const usuarioDB = await PTLUsuarios.findOne({
    where: { codigoUsuario: codigoAdministrador }
  });

  if (!usuarioDB) {
    throw { statusCode: 404, msg: 'ERROREXISTECODE' };
  }

  const isMatch = await bcrypt.compare(claveActual, usuarioDB.claveUsuario);

  if (!isMatch) {
    throw { statusCode: 400, msg: "Contraseña no válida" };
  }

  return usuarioDB;
};

const crearUsuario = async (data) => {
  const existeIdentificacion = await PTLUsuarios.findOne({
    where: { identificacionUsuario: data.identificacionUsuario }
  });

  if (existeIdentificacion) {
    throw { statusCode: 400, msg: 'ERROREXISTEID', usuario: existeIdentificacion };
  }

  // const existeNombre = await PTLUsuarios.findOne({
  //   where: { nombreUsuario: data.nombreUsuario }
  // });

  // if (existeNombre) {
  //   throw { statusCode: 400, msg: 'ERROREXISTENAME' };
  // }

  const salt = bcrypt.genSaltSync();
  data.claveUsuario = await bcrypt.hash(data.claveUsuario, salt);
  data.fotoUsuario = 'no-imagen.png';

  const usuarioDB = await PTLUsuarios.create(data);

  io.emit("usuarios-actualizados", {
    action: "create",
    msg: `Usuario creado: ${usuarioDB.nombreUsuario}`,
  });

  return usuarioDB;
};

const actualizarUsuario = async (codigoUsuario, data) => {
  const usuarioDB = await PTLUsuarios.findOne({
    where: { codigoUsuario }
  });

  if (!usuarioDB) {
    throw { statusCode: 404, msg: 'No existe un usuario con ese ID' };
  }

  await PTLUsuarios.update(data, {
    where: { codigoUsuario }
  });

  const usuarioActualizado = await PTLUsuarios.findOne({
    where: { codigoUsuario }
  });

  io.emit("usuarios-actualizados", {
    action: "update",
    msg: `Usuario actualizado: ${usuarioActualizado.nombreUsuario}`,
  });

  return usuarioActualizado;
};

const actualizarClaveUsuario = async (codigoUsuario, data) => {
  const usuarioDB = await PTLUsuarios.findOne({
    where: { codigoUsuario }
  });

  if (!usuarioDB) {
    throw { statusCode: 404, msg: 'No existe un usuario con ese ID' };
  }

  const salt = bcrypt.genSaltSync();
  const password = await bcrypt.hash(data.claveUsuario, salt);

  await PTLUsuarios.update({ claveUsuario: password }, {
    where: { codigoUsuario }
  });

  const usuarioActualizado = await PTLUsuarios.findOne({
    where: { codigoUsuario }
  });

  io.emit("usuarios-actualizados", {
    action: "update",
    msg: `Clave de usuario actualizada: ${usuarioActualizado.nombreUsuario}`,
  });

  return usuarioActualizado;
};

const eliminarUsuario = async (codigoUsuario) => {
  const usuarioDB = await PTLUsuarios.findOne({
    where: { codigoUsuario }
  });

  if (!usuarioDB) {
    throw { statusCode: 404, msg: 'No existe un usuario con ese ID' }; // Corregido 'aplicacion'
  }

  const nombreUsuario = usuarioDB.nombreUsuario;

  const usuarioEliminado = await PTLUsuarios.destroy({
    where: { codigoUsuario }
  });

  io.emit("usuarios-actualizados", {
    action: "delete",
    msg: `Usuario eliminado: ${nombreUsuario}`, // Corregido bug undefined
  });

  return usuarioEliminado;
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  validarPassword,
  crearUsuario,
  actualizarUsuario,
  actualizarClaveUsuario,
  eliminarUsuario,
};
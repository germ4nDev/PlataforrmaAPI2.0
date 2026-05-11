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
    throw { statusCode: 404, msg: "No existe un usuario por ese id" };
  }

  return usuario;
};

const validarPassword = async (codigoAdministrador, claveActual) => {
  const usuarioDB = await PTLUsuarios.findOne({
    where: { codigoUsuario: codigoAdministrador }
  });

  if (!usuarioDB) {
    throw { statusCode: 404, msg: 'No existe un usuario con ese código' }; // Corregido 'suscriptor'
  }

  const isMatch = await bcrypt.compare(claveActual, usuarioDB.claveUsuario);

  if (!isMatch) {
    throw { statusCode: 400, msg: "Contraseña no válida" };
  }

  return usuarioDB;
};

const crearUsuario = async (data) => {
  // Corregido: Buscaba la identificación en la columna nombreUsuario
  const existeIdentificacion = await PTLUsuarios.findOne({
    where: { identificacionUsuario: data.identificacionUsuario }
  });

  if (existeIdentificacion) {
    throw { statusCode: 400, msg: 'Ya existe un usuario con esa identificación' };
  }

  const existeNombre = await PTLUsuarios.findOne({
    where: { nombreUsuario: data.nombreUsuario }
  });

  if (existeNombre) {
    throw { statusCode: 400, msg: 'Ya existe un usuario con ese nombre' };
  }

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

  // Corregido: La variable nuevoUsuario no existía
  const salt = bcrypt.genSaltSync();
  const password = await bcrypt.hash(data.claveUsuario, salt);

  // Actualizamos explícitamente solo la clave
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
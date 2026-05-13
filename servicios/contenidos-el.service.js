const sequelize = require('../database/connection');
const PTLContenidosEL = require('../models/contenido-el')(sequelize);
const { io } = require('../index');

const obtenerContenidos = async () => {
  return await PTLContenidosEL.findAll();
};

const obtenerContenidoPorId = async (codigoContenido) => {
  const contenido = await PTLContenidosEL.findOne({
    where: { codigoContenido },
  });

  if (!contenido) {
    throw { statusCode: 404, msg: "No existe un contenido por ese id" };
  }

  return contenido;
};

const crearContenido = async (data) => {
  const existeNombre = await PTLContenidosEL.findOne({
    where: { nombreContenido: data.nombreContenido }
  });

  if (existeNombre) {
    throw { statusCode: 400, msg: 'Ya existe un contenido con ese nombre' };
  }

  const contenidoDB = await PTLContenidosEL.create(data);

  io.emit('contenidos-actualizadas', {
    action: 'create',
    msg: `Contenido creado: ${contenidoDB.nombreContenido}`
  });

  return contenidoDB;
};

const actualizarContenido = async (codigoContenido, data) => {
  const contenidoDB = await PTLContenidosEL.findOne({
    where: { codigoContenido }
  });

  if (!contenidoDB) {
    throw { statusCode: 404, msg: 'No existe un contenido con ese ID' };
  }

  await PTLContenidosEL.update(data, {
    where: { codigoContenido }
  });

  const contenidoActualizado = await PTLContenidosEL.findOne({
    where: { codigoContenido }
  });

  io.emit('contenidos-actualizadas', {
    action: 'update',
    msg: `Contenido actualizado: ${contenidoActualizado.nombreContenido}`
  });

  return contenidoActualizado;
};

const eliminarContenido = async (codigoContenido) => {
  const contenidoDB = await PTLContenidosEL.findOne({
    where: { codigoContenido }
  });

  if (!contenidoDB) {
    throw { statusCode: 404, msg: 'No existe un contenido con ese ID' };
  }

  const contenidoEliminado = await PTLContenidosEL.destroy({
    where: { codigoContenido }
  });

  io.emit('contenidos-actualizadas', {
    action: 'delete',
    msg: `Contenido eliminado correctamente`
  });

  return contenidoEliminado;
};

module.exports = {
  obtenerContenidos,
  obtenerContenidoPorId,
  crearContenido,
  actualizarContenido,
  eliminarContenido,
};
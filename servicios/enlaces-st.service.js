const sequelize = require('../database/connection');
const PTLEnlacesST = require('../models/enlace-st')(sequelize);
const { io } = require('../index');

const obtenerEnlaces = async () => {
  return await PTLEnlacesST.findAll();
};

const obtenerEnlacePorId = async (codigoEnlace) => {
  const enlace = await PTLEnlacesST.findOne({
    where: { codigoEnlace },
  });

  if (!enlace) {
    throw { statusCode: 404, msg: "No existe un enlace por ese id" };
  }

  return enlace;
};

const crearEnlace = async (data) => {
  const existeNombre = await PTLEnlacesST.findOne({
    where: { nombreEnlace: data.nombreEnlace }
  });

  if (existeNombre) {
    throw { statusCode: 400, msg: 'Ya existe un enlace con ese nombre' };
  }

  const enlaceDB = await PTLEnlacesST.create(data);

  io.emit('enlaces-st-actualizadas', {
    action: 'create',
    msg: `Enlace ST creado: ${enlaceDB.nombreEnlace}`
  });

  return enlaceDB;
};

const actualizarEnlace = async (codigoEnlace, data) => {
  const enlaceDB = await PTLEnlacesST.findOne({
    where: { codigoEnlace }
  });

  if (!enlaceDB) {
    throw { statusCode: 404, msg: 'No existe un enlace con ese ID' };
  }

  await PTLEnlacesST.update(data, {
    where: { codigoEnlace }
  });

  const enlaceActualizado = await PTLEnlacesST.findOne({
    where: { codigoEnlace }
  });

  io.emit('enlaces-st-actualizadas', {
    action: 'update',
    msg: `Enlace ST actualizado: ${enlaceActualizado.nombreEnlace}`
  });

  return enlaceActualizado;
};

const eliminarEnlace = async (codigoEnlace) => {
  const enlaceDB = await PTLEnlacesST.findOne({
    where: { codigoEnlace }
  });

  if (!enlaceDB) {
    throw { statusCode: 404, msg: 'No existe un enlace con ese ID' }; // Corregido: decía 'sitio'
  }

  const nombreEnlace = enlaceDB.nombreEnlace;

  const enlaceEliminado = await PTLEnlacesST.destroy({
    where: { codigoEnlace }
  });

  io.emit('enlaces-st-actualizadas', {
    action: 'delete',
    msg: `Enlace ST eliminado: ${nombreEnlace}`
  });

  return enlaceEliminado;
};

module.exports = {
  obtenerEnlaces,
  obtenerEnlacePorId,
  crearEnlace,
  actualizarEnlace,
  eliminarEnlace,
};
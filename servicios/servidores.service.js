const sequelize = require('../database/connection');
const PTLServidor = require('../models/servidor')(sequelize);
const { io } = require('../index');

const obtenerServidores = async () => {
  return await PTLServidor.findAll();
};

const obtenerServidorPorId = async (codigoServidor) => {
  const servidor = await PTLServidor.findOne({
    where: { codigoServidor },
  });

  if (!servidor) {
    throw { statusCode: 404, msg: "No existe un servidor por ese id" };
  }

  return servidor;
};

const crearServidor = async (data) => {
  const servidorDB = await PTLServidor.create(data);

  io.emit('servidores-actualizados', {
    action: 'create',
    msg: `Servidor creado: ${servidorDB.nombreServidor}`
  });

  return servidorDB;
};

const actualizarServidor = async (codigoServidor, data) => {
  const servidorDB = await PTLServidor.findOne({
    where: { codigoServidor }
  });

  if (!servidorDB) {
    throw { statusCode: 404, msg: 'No existe un servidor con ese ID' };
  }

  await PTLServidor.update(data, {
    where: { codigoServidor }
  });

  const servidorActualizado = await PTLServidor.findOne({
    where: { codigoServidor }
  });

  io.emit('servidores-actualizados', {
    action: 'update',
    msg: `Servidor actualizado: ${servidorActualizado.nombreServidor}`
  });

  return servidorActualizado;
};

const eliminarServidor = async (codigoServidor) => {
  const servidorDB = await PTLServidor.findOne({
    where: { codigoServidor }
  });

  if (!servidorDB) {
    throw { statusCode: 404, msg: 'No existe un servidor con ese ID' };
  }

  const nombreServidor = servidorDB.nombreServidor;

  const servidorEliminado = await PTLServidor.destroy({
    where: { codigoServidor }
  });

  io.emit('servidores-actualizados', {
    action: 'delete',
    msg: `Servidor eliminado: ${nombreServidor}`
  });

  return servidorEliminado;
};

module.exports = {
  obtenerServidores,
  obtenerServidorPorId,
  crearServidor,
  actualizarServidor,
  eliminarServidor,
};
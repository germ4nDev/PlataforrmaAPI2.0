const sequelize = require('../database/connection');
const PTLEstados = require('../models/estado')(sequelize);
const { io } = require('../index');

const obtenerEstados = async () => {
  return await PTLEstados.findAll();
};

const obtenerEstadoPorId = async (estadoId) => {
  const estado = await PTLEstados.findOne({
    where: { estadoId },
  });

  if (!estado) {
    throw { statusCode: 404, msg: "No existe un estado por ese id" };
  }

  return estado;
};

const crearEstado = async (data) => {
  const estadoDB = await PTLEstados.create(data);

  io.emit('estados-actualizadas', {
    action: 'create',
    msg: `Estado creado: ${estadoDB.nombreEstado}`
  });

  return estadoDB;
};

const actualizarEstado = async (estadoId, data) => {
  const estadoDB = await PTLEstados.findOne({
    where: { estadoId }
  });

  if (!estadoDB) {
    throw { statusCode: 404, msg: 'No existe un estado con ese ID' };
  }

  await PTLEstados.update(data, {
    where: { estadoId }
  });

  const estadoActualizado = await PTLEstados.findOne({
    where: { estadoId }
  });

  io.emit('estados-actualizadas', {
    action: 'update',
    msg: `Estado actualizado: ${estadoActualizado.nombreEstado}`
  });

  return estadoActualizado;
};

const eliminarEstado = async (estadoId) => {
  const estadoDB = await PTLEstados.findOne({
    where: { estadoId }
  });

  if (!estadoDB) {
    throw { statusCode: 404, msg: 'No existe un estado con ese ID' };
  }

  const nombreEstado = estadoDB.nombreEstado;

  const estadoEliminado = await PTLEstados.destroy({
    where: { estadoId }
  });

  io.emit('estados-actualizadas', {
    action: 'delete',
    msg: `Estado eliminado: ${nombreEstado}` // Corregido typo 'eliminadp'
  });

  return estadoEliminado;
};

module.exports = {
  obtenerEstados,
  obtenerEstadoPorId,
  crearEstado,
  actualizarEstado,
  eliminarEstado,
};
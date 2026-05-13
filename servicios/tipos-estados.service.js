const sequelize = require('../database/connection');
const PTLTiposEstados = require('../models/tipo-estado')(sequelize);
const { io } = require('../index');

const obtenerTiposEstados = async () => {
  return await PTLTiposEstados.findAll();
};

const obtenerTipoEstadoPorId = async (tipoEstadoId) => {
  const tipoEstado = await PTLTiposEstados.findOne({
    where: { tipoEstadoId },
  });

  if (!tipoEstado) {
    throw { statusCode: 404, msg: "No existe un tipoEstado por ese id" };
  }

  return tipoEstado;
};

const crearTipoEstado = async (data) => {
  const tipoEstadoDB = await PTLTiposEstados.create(data);

  io.emit('tipos-estados-actualizados', { // Corregido el typo "estadps"
    action: 'create',
    msg: `TipoEstado creado: ${tipoEstadoDB.nombreTipo}`
  });

  return tipoEstadoDB;
};

const actualizarTipoEstado = async (tipoEstadoId, data) => {
  const tipoEstadoDB = await PTLTiposEstados.findOne({
    where: { tipoEstadoId }
  });

  if (!tipoEstadoDB) {
    throw { statusCode: 404, msg: 'No existe un tipoEstado con ese ID' };
  }

  await PTLTiposEstados.update(data, {
    where: { tipoEstadoId }
  });

  const tipoEstadoActualizado = await PTLTiposEstados.findOne({
    where: { tipoEstadoId }
  });

  io.emit('tipos-estados-actualizados', { // Corregido el typo "estadps"
    action: 'update',
    msg: `TipoEstado actualizado: ${tipoEstadoActualizado.nombreTipo}`
  });

  return tipoEstadoActualizado;
};

const eliminarTipoEstado = async (tipoEstadoId) => {
  const tipoEstadoDB = await PTLTiposEstados.findOne({
    where: { tipoEstadoId }
  });

  if (!tipoEstadoDB) {
    throw { statusCode: 404, msg: 'No existe un tipoEstado con ese ID' };
  }

  const nombreTipo = tipoEstadoDB.nombreTipo;

  const tipoEstadoEliminado = await PTLTiposEstados.destroy({
    where: { tipoEstadoId }
  });

  io.emit('tipos-estados-actualizados', { // Corregido el typo "estadps"
    action: 'delete',
    msg: `TipoEstado eliminado: ${nombreTipo}`
  });

  return tipoEstadoEliminado;
};

module.exports = {
  obtenerTiposEstados,
  obtenerTipoEstadoPorId,
  crearTipoEstado,
  actualizarTipoEstado,
  eliminarTipoEstado,
};
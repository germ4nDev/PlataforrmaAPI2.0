const sequelize = require('../database/connection');
const PTLTiposValor = require('../models/tipo-valor')(sequelize);
const { io } = require('../index');

const obtenerTiposValor = async () => {
  return await PTLTiposValor.findAll();
};

const obtenerTipoValorPorId = async (tipoValorId) => {
  const tipoValor = await PTLTiposValor.findOne({
    where: { tipoValorId },
  });

  if (!tipoValor) {
    throw { statusCode: 404, msg: "No existe un tipoValor por ese id" };
  }

  return tipoValor;
};

const crearTipoValor = async (data) => {
  const tipoValorDB = await PTLTiposValor.create(data);

  io.emit('tipos-valores-actualizados', {
    action: 'create',
    msg: `TipoValor creado: ${tipoValorDB.nombreTipo}`
  });

  return tipoValorDB;
};

const actualizarTipoValor = async (tipoValorId, data) => {
  const tipoValorDB = await PTLTiposValor.findOne({
    where: { tipoValorId }
  });

  if (!tipoValorDB) {
    throw { statusCode: 404, msg: 'No existe un tipoValor con ese ID' };
  }

  await PTLTiposValor.update(data, {
    where: { tipoValorId }
  });

  const tipoValorActualizado = await PTLTiposValor.findOne({
    where: { tipoValorId }
  });

  io.emit('tipos-valores-actualizados', {
    action: 'update',
    msg: `TipoValor actualizado: ${tipoValorActualizado.nombreTipo}`
  });

  return tipoValorActualizado;
};

const eliminarTipoValor = async (tipoValorId) => {
  const tipoValorDB = await PTLTiposValor.findOne({
    where: { tipoValorId }
  });

  if (!tipoValorDB) {
    throw { statusCode: 404, msg: 'No existe un tipoValor con ese ID' };
  }

  const nombreTipo = tipoValorDB.nombreTipo;

  const tipoValorEliminado = await PTLTiposValor.destroy({
    where: { tipoValorId }
  });

  io.emit('tipos-valores-actualizados', {
    action: 'delete',
    msg: `TipoValor eliminado: ${nombreTipo}`
  });

  return tipoValorEliminado;
};

module.exports = {
  obtenerTiposValor,
  obtenerTipoValorPorId,
  crearTipoValor,
  actualizarTipoValor,
  eliminarTipoValor,
};
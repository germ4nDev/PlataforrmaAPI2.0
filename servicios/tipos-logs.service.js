const sequelize = require('../database/connection');
const PTLTiposLogs = require('../models/tipo-log')(sequelize);
const { io } = require('../index');

const obtenerTiposLogs = async () => {
  return await PTLTiposLogs.findAll();
};

const obtenerTipoLogPorId = async (codigoTipoLog) => {
  const tipoLog = await PTLTiposLogs.findOne({
    where: { codigoTipoLog },
  });

  if (!tipoLog) {
    throw { statusCode: 404, msg: "No existe un tipo de log por ese id" };
  }

  return tipoLog;
};

const crearTipoLog = async (data) => {
  const tipoLogDB = await PTLTiposLogs.create(data);

  io.emit('tipos-logs-actualizados', { // Corregido el evento del socket
    action: 'create',
    // Usamos tipoLogDB en lugar de la variable fantasma tipoEstadoDB
    msg: `TipoLog creado: ${tipoLogDB.nombreTipo || tipoLogDB.nombreTipoLog}`
  });

  return tipoLogDB;
};

const actualizarTipoLog = async (codigoTipoLog, data) => {
  const tipoLogDB = await PTLTiposLogs.findOne({
    where: { codigoTipoLog }
  });

  if (!tipoLogDB) {
    throw { statusCode: 404, msg: 'No existe un tipo de log con ese ID' };
  }

  await PTLTiposLogs.update(data, {
    where: { codigoTipoLog }
  });

  const tipoLogActualizado = await PTLTiposLogs.findOne({
    where: { codigoTipoLog }
  });

  io.emit('tipos-logs-actualizados', { // Corregido el evento del socket
    action: 'update',
    msg: `TipoLog actualizado: ${tipoLogActualizado.nombreTipo || tipoLogActualizado.nombreTipoLog}` // Corregido el mensaje (decía 'creado')
  });

  return tipoLogActualizado;
};

const eliminarTipoLog = async (codigoTipoLog) => {
  const tipoLogDB = await PTLTiposLogs.findOne({
    where: { codigoTipoLog }
  });

  if (!tipoLogDB) {
    throw { statusCode: 404, msg: 'No existe un tipo de log con ese ID' };
  }

  // Guardamos el nombre antes de ejecutar el destroy para evitar el undefined
  const nombreTipoLog = tipoLogDB.nombreTipo || tipoLogDB.nombreTipoLog;

  const tipoLogEliminado = await PTLTiposLogs.destroy({
    where: { codigoTipoLog }
  });

  io.emit('tipos-logs-actualizados', { // Corregido el evento del socket
    action: 'delete',
    msg: `TipoLog eliminado: ${nombreTipoLog}`
  });

  return tipoLogEliminado;
};

module.exports = {
  obtenerTiposLogs,
  obtenerTipoLogPorId,
  crearTipoLog,
  actualizarTipoLog,
  eliminarTipoLog,
};
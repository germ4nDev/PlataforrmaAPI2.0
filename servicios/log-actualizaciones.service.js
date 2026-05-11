const sequelize = require('../database/connection');
const PTLLogsActualizacionesAP = require('../models/log-actualizacion')(sequelize);
const { io } = require('../index');

const obtenerLogsActualizaciones = async () => {
  return await PTLLogsActualizacionesAP.findAll();
};

const obtenerLogActualizacionPorId = async (logId) => {
  const log = await PTLLogsActualizacionesAP.findOne({
    where: { logId } // Ajustado a sintaxis de Sequelize
  });

  if (!log) {
    throw { statusCode: 404, msg: "No existe un log por el id" };
  }

  return log;
};

const crearLogActualizacion = async (data) => {
  const nuevoLog = await PTLLogsActualizacionesAP.create(data);

  io.emit('log-actualizaciones-actualizados', {
    action: 'create',
    msg: `Log Actualización creado: ${nuevoLog.codigoUsuarioCreacion}`
  });

  return nuevoLog;
};

module.exports = {
  obtenerLogsActualizaciones,
  obtenerLogActualizacionPorId,
  crearLogActualizacion,
};
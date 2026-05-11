const sequelize = require('../database/connection');
const PTLLogsTransaccionesAP = require('../models/log-transaccion')(sequelize);
const { io } = require('../index');

const obtenerLogsTransacciones = async () => {
  return await PTLLogsTransaccionesAP.findAll();
};

const obtenerLogTransaccionPorId = async (logId) => {
  const log = await PTLLogsTransaccionesAP.findOne({
    where: { logId } // Ajustado a la sintaxis correcta de Sequelize
  });

  if (!log) {
    throw { statusCode: 404, msg: "No existe un log por el id" };
  }

  return log;
};

const crearLogTransaccion = async (data) => {
  const nuevoLog = await PTLLogsTransaccionesAP.create(data);

  io.emit('log-transacciones-actualizados', {
    action: 'create',
    msg: `Log Transacción creado: ${nuevoLog.codigoUsuarioCreacion}`
  });

  return nuevoLog;
};

module.exports = {
  obtenerLogsTransacciones,
  obtenerLogTransaccionPorId,
  crearLogTransaccion,
};
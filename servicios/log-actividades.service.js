const sequelize = require('../database/connection');
const PTLLogActividadesAP = require('../models/log-actividad')(sequelize);
const { io } = require('../index');

const obtenerLogsActividades = async () => {
  return await PTLLogActividadesAP.findAll();
};

const obtenerLogActividadPorId = async (logId) => {
  const log = await PTLLogActividadesAP.findOne({
    where: { logId } // Ajustado para usar findOne de Sequelize
  });

  if (!log) {
    throw { statusCode: 404, msg: "No existe un log por el id" };
  }

  return log;
};

const crearLogActividad = async (data) => {
  const nuevoLog = await PTLLogActividadesAP.create(data);

  io.emit('log-actividades-actualizados', {
    action: 'create',
    msg: `Log Actividad creado: ${nuevoLog.codigoUsuarioCreacion}`
  });

  return nuevoLog;
};

module.exports = {
  obtenerLogsActividades,
  obtenerLogActividadPorId,
  crearLogActividad,
};
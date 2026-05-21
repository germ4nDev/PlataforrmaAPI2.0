/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service (Immutable Logs)
*/
const sequelize = require('../database/connection');
const { LogActividadModel, LogActividadDTO } = require('../models/log-actividad');
const { io } = require('../index');

class LogsActividadService {
  constructor() {
    this.model = LogActividadModel(sequelize);
  }

  async getLogsActividades() {
    return await this.model.findAll({
      order: [['fechaCreacion', 'DESC']] // Los logs siempre se ven mejor del más reciente al más antiguo
    });
  }

  async getLogActividadPorId(logId) {
    const registro = await this.model.findOne({ where: { logId } });
    if (!registro) throw { statusCode: 404, msg: "No existe el log de actividad solicitado" };
    return registro;
  }

  async createLogActividad(rawData) {
    const dataDTO = LogActividadDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevoLog = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('log-actividades-actualizados', {
          action: 'create',
          msg: `Log de actividad registrado: ${nuevoLog.logId}`
        });
      }

      return nuevoLog;
    });
  }
}

module.exports = LogsActividadService;
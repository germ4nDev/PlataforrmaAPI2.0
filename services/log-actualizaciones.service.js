/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service (Immutable Logs)
*/
const sequelize = require('../database/connection');
const { LogActualizacionModel, LogActualizacionDTO } = require('../models/log-actualizacion');
const { io } = require('../index');

class LogsActualizacionService {
  constructor() {
    this.model = LogActualizacionModel(sequelize);
  }

  async getLogsActualizaciones() {
    return await this.model.findAll({
      order: [['fechaCreacion', 'DESC']] // Orden cronológico inverso
    });
  }

  async getLogActualizacionPorId(logId) {
    const registro = await this.model.findOne({ where: { logId } });
    if (!registro) throw { statusCode: 404, msg: "No existe el log de actualización solicitado" };
    return registro;
  }

  async createLogActualizacion(rawData) {
    const dataDTO = LogActualizacionDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevoLog = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('log-actualizaciones-actualizados', {
          action: 'create',
          msg: `Log de actualización registrado: ${nuevoLog.logId}`
        });
      }

      return nuevoLog;
    });
  }
}

module.exports = LogsActualizacionService;
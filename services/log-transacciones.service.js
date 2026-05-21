/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service (Immutable Logs)
*/
const sequelize = require('../database/connection');
const { LogTransaccionModel, LogTransaccionDTO } = require('../models/log-transaccion');
const { io } = require('../index');

class LogsTransaccionService {
  constructor() {
    this.model = LogTransaccionModel(sequelize);
  }

  async getLogsTransacciones() {
    return await this.model.findAll({
      order: [['fechaCreacion', 'DESC']]
    });
  }

  async getLogTransaccionPorId(logId) {
    const registro = await this.model.findOne({ where: { logId } });
    if (!registro) throw { statusCode: 404, msg: "No existe el log de transacción solicitado" };
    return registro;
  }

  async createLogTransaccion(rawData) {
    const dataDTO = LogTransaccionDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevoLog = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('log-transacciones-actualizados', {
          action: 'create',
          msg: `Log de transacción registrado: ${nuevoLog.logId}`
        });
      }

      return nuevoLog;
    });
  }
}

module.exports = LogsTransaccionService;
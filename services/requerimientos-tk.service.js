/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { RequerimientoModel, RequerimientoDTO } = require('../models/requerimiento');
const { io } = require('../index');

class RequerimientosService {
  constructor() {
    this.model = RequerimientoModel(sequelize);
  }

  async getRequerimientos() {
    return await this.model.findAll();
  }

  async getRequerimientoById(codigoRequerimiento) {
    const registro = await this.model.findOne({ where: { codigoRequerimiento } });
    if (!registro) throw { statusCode: 404, msg: "No existe el requerimiento solicitado" };
    return registro;
  }

  async createRequerimiento(rawData) {
    const dataDTO = RequerimientoDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('requerimientos-actualizados', {
          action: 'create',
          msg: `Requerimiento creado: ${nuevo.nombreRequerimiento}`
        });
      }

      return nuevo;
    });
  }

  async updateRequerimiento(codigoRequerimiento, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = RequerimientoDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoRequerimiento },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el requerimiento con ese ID' };

      await this.model.update(dataDTO, {
        where: { codigoRequerimiento },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoRequerimiento },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('requerimientos-actualizados', {
          action: 'update',
          msg: `Requerimiento actualizado: ${actualizado.nombreRequerimiento}`
        });
      }

      return actualizado;
    });
  }

  async deleteRequerimiento(codigoRequerimiento) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoRequerimiento },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el requerimiento con ese ID' };

      const nombreReq = registroDB.nombreRequerimiento;

      await this.model.destroy({
        where: { codigoRequerimiento },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('requerimientos-actualizados', {
          action: 'delete',
          msg: `Requerimiento eliminado: ${nombreReq}`
        });
      }

      return true;
    });
  }
}

module.exports = RequerimientosService;
/*
    Author: German Valencia
    Refactored for: QPLUS Standard (Joi Validation, DTO & Transactions)
*/
const sequelize = require('../database/connection');
const { AplicacionModel, AplicacionDTO } = require('../models/aplicacion');
const { io } = require('../index');

class AplicacionesService {
  constructor() {
    this.model = AplicacionModel(sequelize);
  }

  async getAplicaciones() {
    return await this.model.findAll();
  }

  async getAplicacionByCode(identificador) {
    return await this.model.findOne({
      where: { codigoAplicacion: identificador }
    });
  }

  async crearAplicacion(rawData) {
    const dataDTO = AplicacionDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevaAplicacion = await this.model.crearAplicacion(dataDTO, { transaction: t });

      io.emit('aplicaciones-actualizadas', {
        action: 'create',
        msg: `Aplicacion creada: ${nuevaAplicacion.nombreAplicacion}`
      });

      return nuevaAplicacion;
    });
  }

  async updateAplicacion(codigoAplicacion, rawData, usuarioId) {
    rawData.codigoUsuario = usuarioId || "SISTEMA";

    const { error, value } = aplicacionSchema.validate(rawData);
    if (error) {
      throw { statusCode: 400, msg: error.details[0].message };
    }

    const dataDTO = AplicacionDTO(value);

    return await sequelize.transaction(async (t) => {
      const dbApp = await this.model.findOne({
        where: { codigoAplicacion },
        transaction: t
      });

      if (!dbApp) {
        throw { statusCode: 404, msg: "No existe la aplicación para update" };
      }

      await this.model.updateAplicacion(dataDTO, {
        where: { codigoAplicacion },
        transaction: t
      });

      const actualizada = await this.model.findOne({
        where: { codigoAplicacion },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('aplicaciones-actualizadas', {
          action: 'update',
          msg: `Aplicación actualizada: ${actualizada.nombreAplicacion}`
        });
      }

      return actualizada;
    });
  }

  async deleteAplicacion(codigoAplicacion) {
    return await sequelize.transaction(async (t) => {
      const dbApp = await this.model.findOne({
        where: { codigoAplicacion },
        transaction: t
      });

      if (!dbApp) {
        throw { statusCode: 404, msg: "No existe una aplicación por el id" };
      }

      await this.model.destroy({
        where: { codigoAplicacion },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('aplicaciones-actualizadas', {
          action: 'delete',
          msg: `Aplicación eliminada: ${dbApp.nombreAplicacion}`
        });
      }

      return dbApp;
    });
  }
}

module.exports = AplicacionesService;
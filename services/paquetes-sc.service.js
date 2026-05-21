/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { PaqueteSCModel, PaqueteSCDTO } = require('../models/paquete-sc');
const { io } = require('../index');

class PaqueteSCService {
  constructor() {
    this.model = PaqueteSCModel(sequelize);
  }

  async getPaquetesSC() {
    return await this.model.findAll();
  }

  async getPaqueteSCById(suscriptorPaqueteId) {
    const registro = await this.model.findOne({ where: { suscriptorPaqueteId } });
    if (!registro) throw { statusCode: 404, msg: "No existe el paquete del suscriptor solicitado" };
    return registro;
  }

  async createPaqueteSC(rawData) {
    const dataDTO = PaqueteSCDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevoPaquete = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('paquetes-sc-actualizados', {
          action: 'create',
          msg: `Paquete SC creado: ${nuevoPaquete.suscriptorPaqueteId}`
        });
      }

      return nuevoPaquete;
    });
  }

  async updatePaqueteSC(suscriptorPaqueteId, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = PaqueteSCDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { suscriptorPaqueteId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el registro para actualizar' };

      await this.model.update(dataDTO, {
        where: { suscriptorPaqueteId },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { suscriptorPaqueteId },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('paquetes-sc-actualizados', {
          action: 'update',
          msg: `Paquete SC actualizado: ${actualizado.suscriptorPaqueteId}`
        });
      }

      return actualizado;
    });
  }

  async deletePaqueteSC(suscriptorPaqueteId) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { suscriptorPaqueteId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el registro con ese ID' };

      const idEliminado = registroDB.suscriptorPaqueteId;

      await this.model.destroy({
        where: { suscriptorPaqueteId },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('paquetes-sc-actualizados', {
          action: 'delete',
          msg: `Paquete SC eliminado: ${idEliminado}`
        });
      }

      return true;
    });
  }
}

module.exports = PaqueteSCService;
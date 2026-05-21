/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { TextoIDModel, TextoIDDTO } = require('../models/texto-id');
const { io } = require('../index');

class TextoIDService {
  constructor() {
    this.model = TextoIDModel(sequelize);
  }

  async getTextos() {
    return await this.model.findAll();
  }

  async getTextoById(textoId) {
    const registro = await this.model.findOne({ where: { textoId } });
    if (!registro) throw { statusCode: 404, msg: "No existe el texto solicitado" };
    return registro;
  }

  async createTexto(rawData) {
    const dataDTO = TextoIDDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevoTexto = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('textos-actualizados', {
          action: 'create',
          msg: `Texto creado: ${nuevoTexto.anclaTexto}`
        });
      }

      return nuevoTexto;
    });
  }

  async updateTexto(textoId, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = TextoIDDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { textoId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el texto para actualizar' };

      await this.model.update(dataDTO, {
        where: { textoId },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { textoId },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('textos-actualizados', {
          action: 'update',
          msg: `Texto actualizado: ${actualizado.anclaTexto}`
        });
      }

      return actualizado;
    });
  }

  async deleteTexto(textoId) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { textoId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el texto con ese ID' };

      const anclaTexto = registroDB.anclaTexto;

      await this.model.destroy({
        where: { textoId },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('textos-actualizados', {
          action: 'delete',
          msg: `Texto eliminado correctamente: ${anclaTexto}`
        });
      }

      return true;
    });
  }
}

module.exports = TextoIDService;
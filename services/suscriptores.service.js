/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { SuscriptorModel, SuscriptorDTO } = require('../models/suscriptor');
const { io } = require("../index");

class SuscriptoresService {
  constructor() {
    this.model = SuscriptorModel(sequelize);
  }

  async getSuscriptores() {
    return await this.model.findAll();
  }

  async getSuscriptorById(codigoSuscriptor) {
    const registro = await this.model.findOne({ where: { codigoSuscriptor } });
    if (!registro) throw { statusCode: 404, msg: "ERROREXISTECODE" };
    return registro;
  }

  async createSuscriptor(rawData) {
    const dataDTO = SuscriptorDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existeIdentificacion = await this.model.findOne({
        where: { identificacionSuscriptor: dataDTO.identificacionSuscriptor },
        transaction: t
      });
      if (existeIdentificacion) throw { statusCode: 400, msg: "ERROREXISTEID" };

      const existeNombre = await this.model.findOne({
        where: { nombreSuscriptor: dataDTO.nombreSuscriptor },
        transaction: t
      });
      if (existeNombre) throw { statusCode: 400, msg: "ERROREXISTENOMBRE" };

      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit("suscriptores-actualizados", {
          action: "create",
          msg: `Suscriptor creado: ${nuevo.nombreSuscriptor}`,
        });
      }

      return nuevo;
    });
  }

  async updateSuscriptor(codigoSuscriptor, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = SuscriptorDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoSuscriptor },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'ERROREXISTECODE' };

      await this.model.update(dataDTO, {
        where: { codigoSuscriptor },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoSuscriptor },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('suscriptores-actualizados', {
          action: 'update',
          msg: `Suscriptor actualizado: ${actualizado.nombreSuscriptor}`
        });
      }

      return actualizado;
    });
  }

  async deleteSuscriptor(codigoSuscriptor) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoSuscriptor },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'ERROREXISTECODE' };

      const nombreSuscriptor = registroDB.nombreSuscriptor;

      await this.model.destroy({
        where: { codigoSuscriptor },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('suscriptores-actualizados', {
          action: 'delete',
          msg: `ELIMINATEDMSG: ${nombreSuscriptor}`
        });
      }

      return true;
    });
  }
}

module.exports = SuscriptoresService;
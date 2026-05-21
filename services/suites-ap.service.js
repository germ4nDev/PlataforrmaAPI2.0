/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { SuiteAPModel, SuiteAPDTO } = require('../models/suites-ap');
const { io } = require('../index');

class SuitesAPService {
  constructor() {
    this.model = SuiteAPModel(sequelize);
  }

  async getSuites() {
    return await this.model.findAll();
  }

  async getSuiteById(codigoSuite) {
    const registro = await this.model.findOne({ where: { codigoSuite } });
    if (!registro) throw { statusCode: 404, msg: "No existe la suite solicitada" };
    return registro;
  }

  async createSuite(rawData) {
    const dataDTO = SuiteAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existeNombre = await this.model.findOne({
        where: { nombreSuite: dataDTO.nombreSuite },
        transaction: t
      });

      if (existeNombre) {
        throw { statusCode: 400, msg: 'Ya existe una suite con ese nombre' };
      }

      const nuevaSuite = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('suites-actualizados', {
          action: 'create',
          msg: `Suite creada: ${nuevaSuite.nombreSuite}`
        });
      }

      return nuevaSuite;
    });
  }

  async updateSuite(codigoSuite, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = SuiteAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoSuite },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe la suite para actualizar' };

      await this.model.update(dataDTO, {
        where: { codigoSuite },
        transaction: t
      });

      const actualizada = await this.model.findOne({
        where: { codigoSuite },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('suites-actualizados', {
          action: 'update',
          msg: `Suite actualizada: ${actualizada.nombreSuite}`
        });
      }

      return actualizada;
    });
  }

  async deleteSuite(codigoSuite) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoSuite },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe la suite con ese ID' };

      const nombreSuite = registroDB.nombreSuite;

      await this.model.destroy({
        where: { codigoSuite },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('suites-actualizados', {
          action: 'delete',
          msg: `Suite eliminada: ${nombreSuite}`
        });
      }

      return true;
    });
  }
}

module.exports = SuitesAPService;
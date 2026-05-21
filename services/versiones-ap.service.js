/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { VersionAPModel, VersionAPDTO } = require('../models/version-ap');
const { io } = require('../index');

class VersionesAPService {
  constructor() {
    this.model = VersionAPModel(sequelize);
  }

  async getVersionesAP() {
    return await this.model.findAll();
  }

  async getVersionAPById(codigoVersion) {
    const version = await this.model.findOne({
      where: { codigoVersion },
    });

    if (!version) {
      throw { statusCode: 404, msg: "No existe una versionAP por ese id" };
    }

    return version;
  }

  async createVersionAP(rawData) {
    const dataDTO = VersionAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevaVersion = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit("versiones-actualizados", {
          action: "create",
          msg: `Versión creada: ${nuevaVersion.nombreVersion}`,
        });
      }

      return nuevaVersion;
    });
  }

  async updateVersionAP(codigoVersion, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || rawData.codigoUsuario || "SISTEMA";

    const dataDTO = VersionAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const versionDB = await this.model.findOne({
        where: { codigoVersion },
        transaction: t
      });

      if (!versionDB) {
        throw { statusCode: 404, msg: "No existe una versionAP por ese id" };
      }

      await this.model.update(dataDTO, {
        where: { codigoVersion },
        transaction: t
      });

      const versionAPActualizada = await this.model.findOne({
        where: { codigoVersion },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit("versiones-actualizados", {
          action: "update",
          msg: `Versión actualizada: ${versionAPActualizada.nombreVersion}`,
        });
      }

      return versionAPActualizada;
    });
  }

  async deleteVersionAP(codigoVersion) {
    return await sequelize.transaction(async (t) => {
      const versionDB = await this.model.findOne({
        where: { codigoVersion },
        transaction: t
      });

      if (!versionDB) {
        throw { statusCode: 404, msg: "No existe una versionAP por ese id" };
      }

      const nombreVersionEliminada = versionDB.nombreVersion;

      const resultado = await this.model.destroy({
        where: { codigoVersion },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit("versiones-actualizados", {
          action: "delete",
          msg: `Versión eliminada: ${nombreVersionEliminada}`,
        });
      }

      return resultado;
    });
  }
}

module.exports = VersionesAPService;
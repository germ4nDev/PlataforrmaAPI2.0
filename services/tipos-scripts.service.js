/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require("../database/connection");
const { TipoScriptModel, TipoScriptDTO } = require("../models/tipo-script");
const { io } = require("../index");

class TipoScriptService {
  constructor() {
    this.model = TipoScriptModel(sequelize);
  }

  async getTiposScripts() {
    return await this.model.findAll();
  }

  async getTipoScriptById(codigoTipo) {
    const registro = await this.model.findOne({ where: { codigoTipo } });
    if (!registro) throw { statusCode: 404, msg: "No existe el tipo de script solicitado" };
    return registro;
  }

  async createTipoScript(rawData) {
    const dataDTO = TipoScriptDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit("tiposScripts-actualizados", {
          action: "create",
          msg: `Tipo de script creado: ${nuevo.nombreTipo}`,
        });
      }

      return nuevo;
    });
  }

  async updateTipoScript(codigoTipo, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = TipoScriptDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoTipo },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe el tipo de script para actualizar" };

      await this.model.update(dataDTO, {
        where: { codigoTipo },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoTipo },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit("tiposScripts-actualizados", {
          action: "update",
          msg: `Tipo de script actualizado: ${actualizado.nombreTipo}`,
        });
      }

      return actualizado;
    });
  }

  async deleteTipoScript(codigoTipo) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoTipo },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe el tipo de script con ese ID" };

      const nombreTipoScript = registroDB.nombreTipo;

      await this.model.destroy({
        where: { codigoTipo },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit("tiposScripts-actualizados", {
          action: "delete",
          msg: `Tipo de script eliminado: ${nombreTipoScript}`,
        });
      }

      return true;
    });
  }
}

module.exports = TipoScriptService;
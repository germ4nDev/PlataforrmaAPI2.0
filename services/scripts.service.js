/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require("../database/connection");
const { ScriptModel, ScriptDTO } = require("../models/scripts");
const { io } = require("../index");

class ScriptsService {
  constructor() {
    this.model = ScriptModel(sequelize);
  }

  async getScripts() {
    return await this.model.findAll();
  }

  async getScriptById(codigoScript) {
    const registro = await this.model.findOne({ where: { codigoScript } });
    if (!registro) throw { statusCode: 404, msg: "No existe el script solicitado" };
    return registro;
  }

  async createScript(rawData) {
    const dataDTO = ScriptDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit("scripts-actualizados", {
          action: "create",
          msg: `Script creado: ${nuevo.nombreScript}`,
        });
      }

      return nuevo;
    });
  }

  async updateScript(codigoScript, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = ScriptDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoScript },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe el script para actualizar" };

      await this.model.update(dataDTO, {
        where: { codigoScript },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoScript },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit("scripts-actualizados", {
          action: "update",
          msg: `Script actualizado: ${actualizado.nombreScript}`,
        });
      }

      return actualizado;
    });
  }

  async deleteScript(codigoScript) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoScript },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe el script con ese ID" };

      const nombreScript = registroDB.nombreScript;

      await this.model.destroy({
        where: { codigoScript },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit("scripts-actualizados", {
          action: "delete",
          msg: `Script eliminado: ${nombreScript}`,
        });
      }

      return true;
    });
  }
}

module.exports = ScriptsService;
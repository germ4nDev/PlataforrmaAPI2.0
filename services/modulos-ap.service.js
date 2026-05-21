/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require("../database/connection");
const { ModuloAPModel, ModuloAPDTO } = require("../models/modulo-ap");
const { io } = require('../index');

class ModulosAPService {
  constructor() {
    this.model = ModuloAPModel(sequelize);
  }

  async getModulos() {
    return await this.model.findAll();
  }

  async getModuloById(codigoModulo) {
    const registro = await this.model.findOne({ where: { codigoModulo } });
    if (!registro) throw { statusCode: 404, msg: "No existe el módulo solicitado" };
    return registro;
  }

  async createModulo(rawData) {
    const dataDTO = ModuloAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existente = await this.model.findOne({
        where: { codigoModulo: dataDTO.codigoModulo },
        transaction: t
      });

      const existeNombre = await this.model.findOne({
        where: { nombreModulo: dataDTO.nombreModulo },
        transaction: t
      });

      if (existente) throw { statusCode: 400, msg: 'Ya existe un módulo con ese código' };
      if (existeNombre) throw { statusCode: 400, msg: 'Ya existe un módulo con ese nombre' };

      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('modulos-actualizados', {
          action: 'create',
          msg: `Modulo creado: ${nuevo.nombreModulo}`
        });
      }

      return nuevo;
    });
  }

  async updateModulo(codigoModulo, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = ModuloAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const moduloOg = await this.model.findOne({
        where: { codigoModulo },
        transaction: t
      });

      if (!moduloOg) throw { statusCode: 404, msg: "No existe un modulo por ese id" };

      await this.model.update(dataDTO, {
        where: { codigoModulo },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoModulo },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('modulos-actualizados', {
          action: 'update',
          msg: `Modulo actualizado: ${actualizado.nombreModulo}`
        });
      }

      return actualizado;
    });
  }

  async deleteModulo(codigoModulo) {
    return await sequelize.transaction(async (t) => {
      const registro = await this.model.findOne({
        where: { codigoModulo },
        transaction: t
      });

      if (!registro) throw { statusCode: 404, msg: "No existe un modulo por ese id" };

      const nombreModulo = registro.nombreModulo;

      await this.model.destroy({
        where: { codigoModulo },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('modulos-actualizados', {
          action: 'delete',
          msg: `Modulo eliminado: ${nombreModulo}`
        });
      }

      return true;
    });
  }
}

module.exports = ModulosAPService;
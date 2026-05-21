/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { ModuloPaqueteModel, ModuloPaqueteDTO } = require('../models/modulo-paquete');
const { io } = require('../index');

class ModuloPaqueteService {
  constructor() {
    this.model = ModuloPaqueteModel(sequelize);
  }

  async getModulosPaquete() {
    return await this.model.findAll();
  }

  async getModulosPaqueteById(codigoModulo) {
    const registro = await this.model.findOne({ where: { codigoModulo } });
    if (!registro) throw { statusCode: 404, msg: "No existe el módulo de paquete solicitado" };
    return registro;
  }

  async getModulosPaqueteByCode(codigoPaquete) {
    const registros = await this.model.findAll({ where: { codigoPaquete } });
    if (!registros || registros.length === 0) {
      throw { statusCode: 404, msg: "No existen módulos para ese código de paquete" };
    }
    return registros;
  }

  async createModulosPaquete(rawData) {
    return await sequelize.transaction(async (t) => {
      await this.model.destroy({
        where: {
          codigoPaquete: rawData.codigoPaquete,
          codigoAplicacion: rawData.codigoAplicacion,
          codigoSuite: rawData.codigoSuite,
        },
        transaction: t
      });

      if (rawData.modulos && Array.isArray(rawData.modulos)) {
        const modulosLimpios = rawData.modulos.map(mod => ModuloPaqueteDTO(mod));
        await this.model.bulkCreate(modulosLimpios, { transaction: t });
      }

      const nuevos = await this.model.findAll({
        where: {
          codigoPaquete: rawData.codigoPaquete,
          codigoAplicacion: rawData.codigoAplicacion,
          codigoSuite: rawData.codigoSuite,
        },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('modulos-paquete-actualizados', {
          action: 'create',
          msg: `Paquete de módulos procesado correctamente`
        });
      }

      return nuevos;
    });
  }

  async updateModulosPaquete(codigoModulo, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = ModuloPaqueteDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroOg = await this.model.findOne({
        where: { codigoModulo },
        transaction: t
      });

      if (!registroOg) throw { statusCode: 404, msg: "No existe el módulo de paquete para actualizar" };

      await this.model.update(dataDTO, {
        where: { codigoModulo },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoModulo },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('modulos-paquete-actualizados', {
          action: 'update',
          msg: `Módulo actualizado: ${actualizado.nombreModulo || codigoModulo}`
        });
      }

      return actualizado;
    });
  }

  async deleteModulosPaquete(codigoModuloPQ) {
    return await sequelize.transaction(async (t) => {
      const registro = await this.model.findOne({
        where: { codigoModuloPQ },
        transaction: t
      });

      if (!registro) throw { statusCode: 404, msg: "No existe el módulo de paquete" };

      await this.model.destroy({
        where: { codigoModuloPQ },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('modulos-paquete-actualizados', {
          action: 'delete',
          msg: `Módulo de paquete eliminado`
        });
      }

      return true;
    });
  }
}

module.exports = ModuloPaqueteService;
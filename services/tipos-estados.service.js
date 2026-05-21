/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { TipoEstadoModel, TipoEstadoDTO } = require('../models/tipo-estado');
const { io } = require('../index');

class TipoEstadoService {
  constructor() {
    this.model = TipoEstadoModel(sequelize);
  }

  async getTiposEstados() {
    return await this.model.findAll();
  }

  async getTipoEstadoById(tipoEstadoId) {
    const registro = await this.model.findOne({ where: { tipoEstadoId } });
    if (!registro) throw { statusCode: 404, msg: "No existe el tipo de estado solicitado" };
    return registro;
  }

  async createTipoEstado(rawData) {
    const dataDTO = TipoEstadoDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('tipos-estados-actualizados', {
          action: 'create',
          msg: `Tipo de Estado creado: ${nuevo.nombreTipo}`
        });
      }

      return nuevo;
    });
  }

  async updateTipoEstado(tipoEstadoId, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = TipoEstadoDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { tipoEstadoId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el tipo de estado para actualizar' };

      await this.model.update(dataDTO, {
        where: { tipoEstadoId },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { tipoEstadoId },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('tipos-estados-actualizados', {
          action: 'update',
          msg: `Tipo de Estado actualizado: ${actualizado.nombreTipo}`
        });
      }

      return actualizado;
    });
  }

  async deleteTipoEstado(tipoEstadoId) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { tipoEstadoId },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el tipo de estado con ese ID' };

      const nombreTipo = registroDB.nombreTipo;

      await this.model.destroy({
        where: { tipoEstadoId },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('tipos-estados-actualizados', {
          action: 'delete',
          msg: `Tipo de Estado eliminado: ${nombreTipo}`
        });
      }

      return true;
    });
  }
}

module.exports = TipoEstadoService;
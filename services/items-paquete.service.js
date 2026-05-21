/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { ItemPaqueteModel, ItemPaqueteDTO } = require('../models/item-paquete');
const { io } = require('../index');

class ItemPaqueteService {
  constructor() {
    this.model = ItemPaqueteModel(sequelize);
  }

  async obtenerItemsPaquete() {
    return await this.model.findAll();
  }

  async obtenerItemPaquetePorId(codigoItem) {
    const registro = await this.model.findOne({ where: { codigoItem } });
    if (!registro) throw { statusCode: 404, msg: "No existe el ítem de paquete solicitado" };
    return registro;
  }

  async obtenerItemsPaquetePorCodigoPaquete(codigoPaquete) {
    const registros = await this.model.findAll({ where: { codigoPaquete } });
    if (!registros || registros.length === 0) {
      throw { statusCode: 404, msg: "No existen ítems para ese código de paquete" };
    }
    return registros;
  }

  async crearItemPaquete(rawData) {
    const dataDTO = ItemPaqueteDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existente = await this.model.findOne({
        where: { codigoItem: dataDTO.codigoItem },
        transaction: t
      });

      if (existente) {
        throw { statusCode: 400, msg: `El código ${dataDTO.codigoItem} ya está registrado` };
      }

      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('items-paquete-actualizados', {
          action: 'create',
          msg: `Item Paquete creado: ${nuevo.codigoItem}`
        });
      }

      return nuevo;
    });
  }

  async actualizarItemPaquete(codigoItem, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = ItemPaqueteDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoItem },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe el ítem para actualizar" };

      await this.model.update(dataDTO, {
        where: { codigoItem },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoItem },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('items-paquete-actualizados', {
          action: 'update',
          msg: `Item actualizado: ${actualizado.nombreItem}`
        });
      }

      return actualizado;
    });
  }

  async eliminarItemPaquete(codigoItem) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoItem },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe el ítem con ese ID" };

      const nombreItem = registroDB.nombreItem;

      await this.model.destroy({
        where: { codigoItem },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('items-paquete-actualizados', {
          action: 'delete',
          msg: `Item eliminado: ${nombreItem}`
        });
      }

      return true;
    });
  }
}

module.exports = ItemPaqueteService;
/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { ItemModel, ItemDTO } = require('../models/item');
const { io } = require('../index');

class ItemService {
  constructor() {
    this.model = ItemModel(sequelize);
  }

  async getItems() {
    return await this.model.findAll();
  }

  async getItemById(codigoItem) {
    const registro = await this.model.findOne({ where: { codigoItem } });
    if (!registro) throw { statusCode: 404, msg: "No existe el ítem solicitado" };
    return registro;
  }

  async createItem(rawData) {
    const dataDTO = ItemDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit("items-actualizados", {
          action: "create",
          msg: `Item creado: ${nuevo.nombreItem}`,
        });
      }

      return nuevo;
    });
  }

  async updateItem(codigoItem, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = ItemDTO(rawData);

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
        io.emit("items-actualizados", {
          action: "update",
          msg: `Item actualizado: ${actualizado.nombreItem}`,
        });
      }

      return actualizado;
    });
  }

  async deleteItem(codigoItem) {
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
        io.emit("items-actualizados", {
          action: "delete",
          msg: `Item eliminado: ${nombreItem}`,
        });
      }

      return true;
    });
  }
}

module.exports = ItemService;
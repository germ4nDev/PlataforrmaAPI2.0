/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { ContenidoModel, ContenidoDTO } = require('../models//contenido-el');
const { io } = require('../index');

class ContenidosELService {
  constructor() {
    this.model = ContenidoModel(sequelize);
  }

  async getContenidos() {
    return await this.model.findAll();
  }

  async getContenidoByCode(codigoContenidoEL) {
    const registro = await this.model.findOne({ where: { codigoContenido } });
    if (!registro) throw { statusCode: 404, msg: "No existe el contenido de base de datos" };
    return registro;
  }

  async createContenido(rawData) {
    const dataDTO = ContenidoDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const newContenido = await this.model.create(dataDTO, { transaction: t });

      io.emit('contenidos-el-actualizados', {
        action: 'create',
        msg: `ContenidoEL creada: ${newContenido.nombreContenido}`
      });

      return nuevaContenidoEL;
    });
  }

  async updateContenido(codigoContenido, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = ContenidoDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoContenido },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el contenido con ese ID' };

      await this.model.update(dataDTO, {
        where: { codigoContenido },
        transaction: t
      });

      const actualizada = await this.model.findOne({
        where: { codigoContenido },
        transaction: t
      });

      io.emit('contenidos-el-actualizados', {
        action: 'update',
        msg: `ContenidoEL actualizado: ${actualizada.nombreContenido}`
      });

      return actualizada;
    });
  }

  async deleteContenido(codigoContenido) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoContenido },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el contenido con ese ID' };

      await this.model.destroy({
        where: { codigoContenido },
        transaction: t
      });

      io.emit('contenidos-el-actualizados', {
        action: 'delete',
        msg: `ContenidoEL eliminado oorrectamente`
      });

      return true;
    });
  }
}

module.exports = ContenidosELService;
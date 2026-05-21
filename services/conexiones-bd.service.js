/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { ConexionesBDModel, ConexionesBDDTO } = require('../models/conexion-bd');
const { io } = require('../index');

class ConexionesBDService {
  constructor() {
    this.model = ConexionesBDModel(sequelize);
  }

  async getConexiones() {
    return await this.model.findAll();
  }

  async getConexionPorId(codigoConexion) {
    const registro = await this.model.findOne({ where: { codigoConexion } });
    if (!registro) throw { statusCode: 404, msg: "No existe la conexión de base de datos" };
    return registro;
  }

  async createConexion(rawData) {
    const dataDTO = ConexionesBDDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevaConexion = await this.model.create(dataDTO, { transaction: t });

      io.emit('conexiones-db-actualizadas', {
        action: 'create',
        msg: `Conexión BD creada: ${nuevaConexion.nombreConexion}`
      });

      return nuevaConexion;
    });
  }

  async updateConexion(codigoConexion, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = ConexionesBDDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoConexion },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe la conexión con ese ID' };

      await this.model.update(dataDTO, {
        where: { codigoConexion },
        transaction: t
      });

      const actualizada = await this.model.findOne({
        where: { codigoConexion },
        transaction: t
      });

      io.emit('conexiones-db-actualizadas', {
        action: 'update',
        msg: `Conexión BD actualizada: ${actualizada.nombreConexion}`
      });

      return actualizada;
    });
  }

  async deleteConexion(codigoConexion) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoConexion },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe la conexión con ese ID' };

      await this.model.destroy({
        where: { codigoConexion },
        transaction: t
      });

      io.emit('conexiones-db-actualizadas', {
        action: 'delete',
        msg: `Conexión BD eliminada correctamente`
      });

      return true;
    });
  }
}

module.exports = ConexionesBDService;
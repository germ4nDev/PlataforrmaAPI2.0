/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { EnlaceSTModel, EnlaceSTDTO } = require('../models/enlace-st');
const { io } = require('../index');

class EnlaceSTService {
  constructor() {
    this.model = EnlaceSTModel(sequelize);
  }

  async obtenerEnlaces() {
    return await this.model.findAll();
  }

  async obtenerEnlacePorId(codigoEnlace) {
    const registro = await this.model.findOne({ where: { codigoEnlace } });
    if (!registro) throw { statusCode: 404, msg: "No existe el enlace solicitado" };
    return registro;
  }

  async crearEnlace(rawData) {
    const dataDTO = EnlaceSTDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existeNombre = await this.model.findOne({
        where: { nombreEnlace: dataDTO.nombreEnlace },
        transaction: t
      });

      if (existeNombre) {
        throw { statusCode: 400, msg: 'Ya existe un enlace con ese nombre' };
      }

      const enlaceDB = await this.model.create(dataDTO, { transaction: t });

      io.emit('enlaces-st-actualizadas', {
        action: 'create',
        msg: `Enlace ST creado: ${enlaceDB.nombreEnlace}`
      });

      return enlaceDB;
    });
  }

  async actualizarEnlace(codigoEnlace, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = EnlaceSTDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoEnlace },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe un enlace con ese ID' };

      await this.model.update(dataDTO, {
        where: { codigoEnlace },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoEnlace },
        transaction: t
      });

      io.emit('enlaces-st-actualizadas', {
        action: 'update',
        msg: `Enlace ST actualizado: ${actualizado.nombreEnlace}`
      });

      return actualizado;
    });
  }

  async eliminarEnlace(codigoEnlace) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoEnlace },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe un enlace con ese ID' };

      const nombreEnlace = registroDB.nombreEnlace;

      await this.model.destroy({
        where: { codigoEnlace },
        transaction: t
      });

      io.emit('enlaces-st-actualizadas', {
        action: 'delete',
        msg: `Enlace ST eliminado: ${nombreEnlace}`
      });

      return true;
    });
  }
}

module.exports = EnlaceSTService;
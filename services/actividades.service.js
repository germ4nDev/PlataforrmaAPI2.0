/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Transactions & Service Layer (CLASS VERSION)
*/
const sequelize = require("../database/connection");
const { ActividadModel, ActividadDTO } = require("../models/actividad");
const { io } = require("../index");

class ActividadesService {
  constructor() {
    this.model = ActividadModel(sequelize);
  }

  async getActividades() {
    return await this.model.findAll();
  }

  async getActividadPorId(codigoActividad) {
    const registro = await this.model.findOne({ where: { codigoActividad } });
    if (!registro) throw { statusCode: 404, msg: "No existe la actividad" };
    return registro;
  }

  async getActividadesPorApp(codigoAplicacion) {
    return await this.model.findAll({ where: { codigoAplicacion } });
  }

  async getActividadesPorSuite(codigoSuite) {
    return await this.model.findAll({ where: { codigoSuite } });
  }

  async getActividadesPorModulo(codigoModulo) {
    return await this.model.findAll({ where: { codigoModulo } });
  }

  async createActividad(rawData) {
    const dataDTO = ActividadDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existente = await this.model.findOne({
        where: { codigoActividad: dataDTO.codigoActividad },
        transaction: t
      });
      const existeNombre = await this.model.findOne({
        where: { actividad: dataDTO.actividad },
        transaction: t
      });

      if (existente) throw { statusCode: 400, msg: "Ya existe una actividad con ese código" };
      if (existeNombre) throw { statusCode: 400, msg: "Ya existe una actividad con ese nombre" };

      const actividadDB = await this.model.create(dataDTO, { transaction: t });

      io.emit("actividades-actualizadas", {
        action: "create",
        msg: `Actividad creada: ${actividadDB.actividad}`,
      });

      return actividadDB;
    });
  }

  async updateActividad(codigoActividad, rawData, usuarioId) {
    rawData.codigoUsuario = usuarioId || rawData.codigoUsuario || "SISTEMA";
    const dataDTO = ActividadDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const actividadDB = await this.model.findOne({ where: { codigoActividad }, transaction: t });

      if (!actividadDB) throw { statusCode: 404, msg: "No existe la actividad" };

      await this.model.update(dataDTO, { where: { codigoActividad }, transaction: t });

      const actualizada = await this.model.findOne({ where: { codigoActividad }, transaction: t });

      io.emit("actividades-actualizadas", {
        action: "update",
        msg: `Actividad actualizada: ${actualizada.actividad}`,
      });

      return actualizada;
    });
  }

  async deleteActividad(codigoActividad) {
    return await sequelize.transaction(async (t) => {
      const actividadDB = await this.model.findOne({ where: { codigoActividad }, transaction: t });

      if (!actividadDB) throw { statusCode: 404, msg: "No existe la actividad" };

      const nombreActividad = actividadDB.actividad;
      await this.model.destroy({ where: { codigoActividad }, transaction: t });

      io.emit("actividades-actualizadas", {
        action: "delete",
        msg: `Actividad eliminada: ${nombreActividad}`,
      });

      return true;
    });
  }
}

module.exports = ActividadesService;
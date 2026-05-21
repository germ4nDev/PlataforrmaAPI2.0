/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Transactions & Service Layer
*/
const sequelize = require("../database/connection");
const { ActividadRoleModel, ActividadRoleDTO } = require("../models/actividad-role");
const { io } = require("../index");

class ActividadesRolesService {
  constructor() {
    this.model = ActividadRoleModel(sequelize);
  }

  async getActividadesRoles() {
    return await this.model.findAll();
  }

  async getPorCodigoActividad(codigoActividad) {
    const registros = await this.model.findAll({
      where: { codigoActividad }
    });
    if (registros.length === 0) throw { statusCode: 404, msg: "No se encontraron registros" };
    return registros;
  }

  async getPorCodigoRole(codigoRole) {
    const registros = await this.model.findAll({
      where: { codigoRole }
    });
    if (registros.length === 0) throw { statusCode: 404, msg: "No se encontraron registros" };
    return registros;
  }

  async createActividadRole(rawData) {
    const dataDTO = ActividadRoleDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existe = await this.model.findOne({
        where: {
          codigoActividad: dataDTO.codigoActividad,
          codigoRole: dataDTO.codigoRole,
        },
        transaction: t
      });

      if (existe) {
        throw { statusCode: 400, msg: "Esta relación Actividad-Rol ya existe" };
      }

      const nuevaRelacion = await this.model.create(dataDTO, { transaction: t });

      io.emit("actividades-roles-actualizadas", {
        action: "create",
        msg: `Relación creada exitosamente`,
      });

      return nuevaRelacion;
    });
  }

  async updateActividadRole(codigoActividad, codigoRole, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion;
    const dataDTO = ActividadRoleDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoActividad, codigoRole },
        transaction: t
      });

      if (!registroDB) {
        throw { statusCode: 404, msg: "No se encontró el registro para update" };
      }

      await this.model.update(dataDTO, {
        where: { codigoActividad, codigoRole },
        transaction: t
      });

      return await this.model.findOne({
        where: { codigoActividad, codigoRole },
        transaction: t
      });
    });
  }

  async deleteActividadRole(codigoActividad, codigoRole) {
    return await sequelize.transaction(async (t) => {
      const eliminado = await this.model.destroy({
        where: { codigoActividad, codigoRole },
        transaction: t
      });

      if (eliminado === 0) {
        throw { statusCode: 404, msg: "No se encontró el registro para delete" };
      }

      io.emit("actividades-roles-actualizadas", {
        action: "delete",
        msg: `Relación eliminada`,
      });

      return true;
    });
  }
}

module.exports = ActividadesRolesService;
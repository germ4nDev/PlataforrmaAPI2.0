/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const { RoleAPModel, RoleAPDTO } = require('../models/role');
const { io } = require('../index');

class RolesService {
  constructor() {
    this.model = RoleAPModel(sequelize);
  }

  async getRoles() {
    return await this.model.findAll();
  }

  async getRoleById(codigoRole) {
    const registro = await this.model.findOne({ where: { codigoRole } });
    if (!registro) throw { statusCode: 404, msg: "No existe el rol solicitado" };
    return registro;
  }

  async getRolesByAppCode(codigoAplicacion) {
    return await this.model.findAll({
      where: { codigoAplicacion }
    });
  }

  async createRole(rawData) {
    const dataDTO = RoleAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('roles-actualizados', {
          action: 'create',
          msg: `Rol creado: ${nuevo.nombreRole}`
        });
      }

      return nuevo;
    });
  }

  async updateRole(codigoRole, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = RoleAPDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoRole },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el rol para actualizar' };

      await this.model.update(dataDTO, {
        where: { codigoRole },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoRole },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('roles-actualizados', {
          action: 'update',
          msg: `Rol actualizado: ${actualizado.nombreRole}`
        });
      }

      return actualizado;
    });
  }

  async deleteRole(codigoRole) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoRole },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: 'No existe el rol con ese ID' };

      const nombreRole = registroDB.nombreRole;

      await this.model.destroy({
        where: { codigoRole },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('roles-actualizados', {
          action: 'delete',
          msg: `Rol eliminado: ${nombreRole}`
        });
      }

      return true;
    });
  }
}

module.exports = RolesService;
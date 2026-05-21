/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Managed Transactions
*/
const sequelize = require("../database/connection");
const { UsuarioRoleModel, UsuarioRoleDTO } = require("../models/usuario-role");
const { RoleAPModel } = require("../models/role");
const { UsuarioModel } = require("../models/usuario");
const { io } = require("../index");

class UsuariosRolesService {
  constructor() {
    this.model = UsuarioRoleModel(sequelize);
    this.roleModel = RoleAPModel(sequelize);
    this.usuarioModel = UsuarioModel(sequelize);
  }

  async getUsuariosRoles() {
    const usuRoles = await this.model.findAll();
    console.log('aca', usuRoles);
    return usuRoles;
  }

  async getUsuarioRoleById(usuarioRoleId) {
    const registro = await this.model.findOne({ where: { usuarioRoleId } });
    if (!registro) throw { statusCode: 404, msg: "No existe la relación Usuario-Rol solicitada" };
    return registro;
  }

  async getUsuariosByRoleCode(codigoRole) {
    return await this.model.findAll({ where: { codigoRole } });
  }

  async getRolesByUserId(codigoUsuarioSC) {
    return await this.model.findAll({ where: { codigoUsuarioSC } });
  }

  async createUsuarioRole(rawData) {
    const dataDTO = UsuarioRoleDTO(rawData);
    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });
      this.emitSocket('create', 'Relación Usuario-Rol creada');
      return nuevo;
    });
  }

  async updateRoleAndUsers(codigoRole, datosRol, usuariosSeleccionados) {
    return await sequelize.transaction(async (t) => {
      await this.roleModel.update(datosRol, { where: { codigoRole }, transaction: t });

      await this.model.destroy({ where: { codigoRole }, transaction: t });

      if (usuariosSeleccionados?.length > 0) {
        const nuevasAsociaciones = usuariosSeleccionados.map(codUser => {
          return UsuarioRoleDTO({
            codigoRole: codigoRole,
            codigoUsuarioSC: codUser,
            codigoEmpresaSC: datosRol.codigoEmpresaSC || '',
            estadoUsuarioRole: true,
            codigoUsuario: datosRol.usuarioModificacion // Auditoría DTO
          });
        });
        await this.model.bulkCreate(nuevasAsociaciones, { transaction: t });
      }

      this.emitSocket('update', 'Rol y sus usuarios sincronizados correctamente');
      return { success: true };
    });
  }

  async updateUserAndRoles(codigoUsuario, datosUsuario, rolesSeleccionados) {
    return await sequelize.transaction(async (t) => {
      await this.usuarioModel.update(datosUsuario, { where: { codigoUsuario }, transaction: t });

      await this.model.destroy({ where: { codigoUsuarioSC: codigoUsuario }, transaction: t });

      if (rolesSeleccionados?.length > 0) {
        const nuevasAsociaciones = rolesSeleccionados.map(rol => {
          return UsuarioRoleDTO({
            codigoUsuarioSC: codigoUsuario,
            codigoRole: rol.codigoRole,
            codigoEmpresaSC: datosUsuario.codigoEmpresaSC || '',
            estadoUsuarioRole: true,
            codigoUsuario: datosUsuario.codigoUsuarioModificacion // Auditoría DTO
          });
        });
        await this.model.bulkCreate(nuevasAsociaciones, { transaction: t });
      }

      this.emitSocket('update', 'Usuario y sus roles sincronizados correctamente');
      return { success: true };
    });
  }

  async deleteUsuarioRole(usuarioRoleId) {
    return await sequelize.transaction(async (t) => {
      const registro = await this.model.findOne({ where: { usuarioRoleId }, transaction: t });
      if (!registro) throw { statusCode: 404, msg: "Relación no encontrada" };

      await this.model.destroy({ where: { usuarioRoleId }, transaction: t });
      this.emitSocket('delete', 'Relación Usuario-Rol eliminada');
      return true;
    });
  }

  emitSocket(action, msg) {
    if (typeof io !== 'undefined') {
      io.emit("usuarios-roles-actualizados", { action, msg });
    }
  }
}

module.exports = UsuariosRolesService;
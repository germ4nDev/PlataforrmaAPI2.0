/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require("../database/connection");
const { UsuarioEmpresaModel, UsuarioEmpresaDTO } = require("../models/usuario-empresa-sc");
const { io } = require("../index");

class UsuariosEmpresasSCService {
  constructor() {
    this.model = UsuarioEmpresaModel(sequelize);
  }

  async getUsuariosEmpresas() {
    return await this.model.findAll();
  }

  async getUsuarioEmpresaById(codigoUsuarioEmpresaSC) {
    const registro = await this.model.findOne({ where: { codigoUsuarioEmpresaSC } });
    if (!registro) throw { statusCode: 404, msg: "No existe la relación Usuario-Empresa solicitada" };
    return registro;
  }

  async createUsuarioEmpresa(rawData) {
    const dataDTO = UsuarioEmpresaDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const nuevo = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit('usuarios-empresas-actualizados', {
          action: 'create',
          msg: `Relación Usuario Empresa creada correctamente`
        });
      }

      return nuevo;
    });
  }

  async updateUsuarioEmpresa(codigoUsuarioEmpresaSC, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || "SISTEMA";
    const dataDTO = UsuarioEmpresaDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoUsuarioEmpresaSC },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe la relación para actualizar" };

      await this.model.update(dataDTO, {
        where: { codigoUsuarioEmpresaSC },
        transaction: t
      });

      const actualizado = await this.model.findOne({
        where: { codigoUsuarioEmpresaSC },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('usuarios-empresas-actualizados', {
          action: 'update',
          msg: `Relación Usuario Empresa actualizada`
        });
      }

      return actualizado;
    });
  }

  async deleteUsuarioEmpresa(codigoUsuarioEmpresaSC) {
    return await sequelize.transaction(async (t) => {
      const registroDB = await this.model.findOne({
        where: { codigoUsuarioEmpresaSC },
        transaction: t
      });

      if (!registroDB) throw { statusCode: 404, msg: "No existe la relación con ese ID" };

      await this.model.destroy({
        where: { codigoUsuarioEmpresaSC },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit('usuarios-empresas-actualizados', {
          action: 'delete',
          msg: `Relación Usuario Empresa eliminada`
        });
      }

      return true;
    });
  }
}

module.exports = UsuariosEmpresasSCService;
/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & Class-Based Service
*/
const sequelize = require('../database/connection');
const bcrypt = require("bcryptjs");
const { UsuarioModel, UsuarioDTO } = require('../models/usuario');
const { io } = require('../index');

class UsuariosService {
  constructor() {
    this.model = UsuarioModel(sequelize);
  }

  async getUsuarios() {
    return await this.model.findAll();
  }

  async getUsuarioById(codigoUsuario) {
    const usuario = await this.model.findOne({
      where: { codigoUsuario },
    });

    if (!usuario) {
      throw { statusCode: 404, msg: "ERROREXISTEID" };
    }

    return usuario;
  }

  async validatePassword(codigoAdministrador, claveActual) {
    const usuarioDB = await this.model.findOne({
      where: { codigoUsuario: codigoAdministrador }
    });

    if (!usuarioDB) {
      throw { statusCode: 404, msg: 'ERROREXISTECODE' };
    }

    const isMatch = await bcrypt.compare(claveActual, usuarioDB.claveUsuario);

    if (!isMatch) {
      throw { statusCode: 400, msg: "Contraseña no válida" };
    }

    return usuarioDB;
  }

  async createUsuario(rawData) {
    const dataDTO = UsuarioDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const existeIdentificacion = await this.model.findOne({
        where: { identificacionUsuario: dataDTO.identificacionUsuario },
        transaction: t
      });

      if (existeIdentificacion) {
        throw { statusCode: 400, msg: 'ERROREXISTEID', usuario: existeIdentificacion };
      }

      const salt = bcrypt.genSaltSync();
      dataDTO.claveUsuario = await bcrypt.hash(dataDTO.claveUsuario, salt);
      dataDTO.fotoUsuario = 'no-imagen.png';

      const usuarioDB = await this.model.create(dataDTO, { transaction: t });

      if (typeof io !== 'undefined') {
        io.emit("usuarios-actualizados", {
          action: "create",
          msg: `Usuario creado: ${usuarioDB.nombreUsuario}`,
        });
      }

      return usuarioDB;
    });
  }

  async updateUsuario(codigoUsuario, rawData, usuarioAccion) {
    rawData.codigoUsuario = usuarioAccion || rawData.codigoUsuario || "SISTEMA";
    const dataDTO = UsuarioDTO(rawData);

    return await sequelize.transaction(async (t) => {
      const usuarioDB = await this.model.findOne({
        where: { codigoUsuario },
        transaction: t
      });

      if (!usuarioDB) {
        throw { statusCode: 404, msg: 'No existe un usuario con ese ID' };
      }

      await this.model.update(dataDTO, {
        where: { codigoUsuario },
        transaction: t
      });

      const usuarioActualizado = await this.model.findOne({
        where: { codigoUsuario },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit("usuarios-actualizados", {
          action: "update",
          msg: `Usuario actualizado: ${usuarioActualizado.nombreUsuario}`,
        });
      }

      return usuarioActualizado;
    });
  }

  async updateUsuarioPassword(codigoUsuario, data) {
    return await sequelize.transaction(async (t) => {
      const usuarioDB = await this.model.findOne({
        where: { codigoUsuario },
        transaction: t
      });

      if (!usuarioDB) {
        throw { statusCode: 404, msg: 'No existe un usuario con ese ID' };
      }

      const salt = bcrypt.genSaltSync();
      const hashedPassword = await bcrypt.hash(data.claveUsuario, salt);

      await this.model.update({ claveUsuario: hashedPassword }, {
        where: { codigoUsuario },
        transaction: t
      });

      const usuarioActualizado = await this.model.findOne({
        where: { codigoUsuario },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit("usuarios-actualizados", {
          action: "update",
          msg: `Clave de usuario actualizada: ${usuarioActualizado.nombreUsuario}`,
        });
      }

      return usuarioActualizado;
    });
  }

  async deleteUsuario(codigoUsuario) {
    return await sequelize.transaction(async (t) => {
      const usuarioDB = await this.model.findOne({
        where: { codigoUsuario },
        transaction: t
      });

      if (!usuarioDB) {
        throw { statusCode: 404, msg: 'No existe un usuario con ese ID' };
      }

      const nombreUsuario = usuarioDB.nombreUsuario;

      const resultado = await this.model.destroy({
        where: { codigoUsuario },
        transaction: t
      });

      if (typeof io !== 'undefined') {
        io.emit("usuarios-actualizados", {
          action: "delete",
          msg: `Usuario eliminado: ${nombreUsuario}`,
        });
      }

      return resultado;
    });
  }
}

module.exports = UsuariosService;
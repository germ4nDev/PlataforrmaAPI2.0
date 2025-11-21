/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

module.exports = (sequelize) => {
  return sequelize.define('PTLUsuarios', {
    usuarioId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoUsuario: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    identificacionUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correoUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userNameUsuario: {
      type: DataTypes.STRING,
      unique: true
    },
    claveUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fotoUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuarioAdministrador: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    estadoUsuario: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fechaCreacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fechaModificacion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'PTLUsuarios',
    timestamps: false
  });
};
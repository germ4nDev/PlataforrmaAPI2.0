/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

module.exports = (sequelize) => {
    return sequelize.define('PTLUsuarios', {
      usuarioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      estadoUsuario: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    }, {
      tableName: 'PTLUsuarios',
      timestamps: false
    });
  };
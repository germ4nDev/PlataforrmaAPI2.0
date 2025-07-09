/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

module.exports = (sequelize) => {
    return sequelize.define('PTLUsuarioRoleAP', {
      usuarioRoleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estadoUsuarioRole: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    }, {
      tableName: 'PTLUsuarioRoleAP',
      timestamps: false
    });
  };



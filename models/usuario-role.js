/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLUsuarioRoles', {
      usuarioRoleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      estadoRole: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
      }
    }, {
      tableName: 'PTLUsuarioRoles',
      timestamps: false
    });
  };



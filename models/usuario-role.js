/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

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
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estadoRole: {
        type: DataTypes.BLOB,
        default: false,
        allowNull: false
      }
    }, {
      tableName: 'PTLUsuarioRoleAP',
      timestamps: false
    });
  };



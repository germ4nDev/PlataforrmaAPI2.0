/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLRolesAP', {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      nombreRole: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionRole: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoRole: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLRolesAP',
      timestamps: false
    });
  };
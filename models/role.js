/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLRolesAP', {
      rolId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      nombreRol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionRol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoRol: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLRolesAP',
      timestamps: false
    });
  };
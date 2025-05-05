/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLVersionesAP', {
      versionesId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      nombreVersion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionVersion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoVersion: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    }, {
      tableName: 'PTLVersionesAP',
      timestamps: false
    });
  };
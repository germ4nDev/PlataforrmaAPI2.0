/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLVersionesAP', {
      versionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fechaVersion: {
        type: DataTypes.DATE,
        allowNull: false
      },
      codigoAplicacion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      codigoVersion: {
        type: DataTypes.STRING,
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
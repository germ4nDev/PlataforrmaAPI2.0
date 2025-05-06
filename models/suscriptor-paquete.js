/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLPaquetesSC', {
      suscriptoPaqueteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      suscriptorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      paqueteId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fechaInicio: {
        type: DataTypes.DATETIME,
        default: Date.now(),
        allowNull: false
      },
      fechaVencimiento: {
        type: DataTypes.DATETIME,
        default: Date.now(),
        allowNull: false
      },
      codigoLicencia: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoLicencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLPaquetesSC',
      timestamps: false
    });
  };
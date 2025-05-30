/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLSuscriptoresPaquetes', {
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
        type: DataTypes.DATE,
        allowNull: false
      },
      fechaVencimiento: {
        type: DataTypes.DATE,
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
      tableName: 'PTLSuscriptoresPaquetes',
      timestamps: false
    });
  };
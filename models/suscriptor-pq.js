/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLSuscriptoresPQ', {
      suscriptorPaqueteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigoSuscriptor: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      paqueteId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      conexionId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      fechaInicio: {
        type: DataTypes.DATE,
        default: Date.now(),
        allowNull: false
      },
      fechaVencimiento: {
        type: DataTypes.DATE,
        default: Date.now(),
        allowNull: false
      },
      codigoLicencia: {
        type: DataTypes.STRING,
        default: false,
      },
      estadoLicencia: {
        type: DataTypes.BOOLEAN,
        default: false,
      }
    }, {
      tableName: 'PTLSuscriptoresPQ',
      timestamps: false
    });
  };
/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLPaquetesSC', {
    suscriptoPaqueteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigoSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoPaquete: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoLicencia: {
      type: DataTypes.STRING,
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
    estadoLicencia: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'PTLPaquetesSC',
    timestamps: false
  });
};
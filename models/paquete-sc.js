/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & Sequelize Syntax
*/
const { DataTypes } = require('sequelize');

const PaqueteSCModel = (sequelize) => {
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
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaVencimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoLicencia: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'PTLPaquetesSC',
    timestamps: false
  });
};

const PaqueteSCDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoSuscriptor: data.codigoSuscriptor,
    codigoPaquete: data.codigoPaquete,
    codigoLicencia: data.codigoLicencia,
    fechaInicio: data.fechaInicio || fechaActual,
    fechaVencimiento: data.fechaVencimiento || fechaActual,

    estadoLicencia: data.estadoLicencia ?? true,
    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  PaqueteSCModel,
  PaqueteSCDTO
};
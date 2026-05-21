/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const LogActividadModel = (sequelize) => {
  return sequelize.define('PTLLogActividadesAP', {
    logId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigoAplicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoSuite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoModulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoTipoLog: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoRespuesta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaLog: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionLog: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'PTLLogActividadesAP',
    timestamps: false
  });
};

const LogActividadDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoAplicacion: data.codigoAplicacion,
    codigoSuite: data.codigoSuite,
    codigoModulo: data.codigoModulo,
    codigoTipoLog: data.codigoTipoLog,
    codigoRespuesta: data.codigoRespuesta,
    descripcionLog: data.descripcionLog || '',

    fechaLog: data.fechaLog || fechaActual,
    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual
  };
};

module.exports = {
  LogActividadModel,
  LogActividadDTO
};
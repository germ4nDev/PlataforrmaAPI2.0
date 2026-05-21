/*
    Author: John Castañeda
    Refactored for: QPLUS DTO Pattern, Entity Standardization & Duplicity Fix
*/
const { DataTypes } = require('sequelize');

const TipoLogModel = (sequelize) => {
  return sequelize.define('PTLTiposLogs', {
    tipoLogId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    codigoTipoLog: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombreTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoRespuesta: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '200'
    },
    estadoTipo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    tableName: 'PTLTiposLogs',
    timestamps: false
  });
};

const TipoLogDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoTipoLog: data.codigoTipoLog,
    nombreTipo: data.nombreTipo,
    descripcionTipo: data.descripcionTipo || '',
    codigoRespuesta: data.codigoRespuesta || '200',
    estadoTipo: data.estadoTipo ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  TipoLogModel,
  TipoLogDTO
};
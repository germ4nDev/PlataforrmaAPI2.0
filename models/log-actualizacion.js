/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & Sequelize Syntax
*/
const { DataTypes } = require('sequelize');

const LogActualizacionModel = (sequelize) => {
  return sequelize.define('PTLLogActualizacionesAP', {
    logId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigoAplicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaLog: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descripcionLog: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
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
    tableName: 'PTLLogActualizacionesAP',
    timestamps: false
  });
};

const LogActualizacionDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoAplicacion: data.codigoAplicacion,
    codigoVersion: data.codigoVersion,
    fechaLog: data.fechaLog || fechaActual,
    descripcionLog: data.descripcionLog || 'Actualización de versión registrada',

    usuarioId: data.usuarioId || 0,
    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  LogActualizacionModel,
  LogActualizacionDTO
};
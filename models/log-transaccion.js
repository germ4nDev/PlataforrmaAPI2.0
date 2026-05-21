/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & Sequelize Syntax
*/
const { DataTypes } = require('sequelize');

const LogTransaccionModel = (sequelize) => {
  return sequelize.define('PTLLogTransaccionesAP', {
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
    usuarioId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    codigoError: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaLog: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionLog: {
      type: DataTypes.STRING,
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
    tableName: 'PTLLogTransaccionesAP',
    timestamps: false
  });
};

const LogTransaccionDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoAplicacion: data.codigoAplicacion,
    codigoSuite: data.codigoSuite,
    codigoModulo: data.codigoModulo,
    usuarioId: data.usuarioId || 0,
    codigoError: data.codigoError || data.codigoErrr || 'SIN_CODIGO',

    fechaLog: data.fechaLog || fechaActual,
    descripcionLog: data.descripcionLog || 'Transacción registrada sin descripción',

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  LogTransaccionModel,
  LogTransaccionDTO
};
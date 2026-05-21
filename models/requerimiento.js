/*
    Author: German Valencia
    Actualización: John Castañeda
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const RequerimientoModel = (sequelize) => {
  return sequelize.define('PTLRequerimientosTK', {
    requerimientoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoRequerimiento: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreRequerimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionRequerimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoRequerimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDIENTE'
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
    tableName: 'PTLRequerimientosTK',
    timestamps: false
  });
};

const RequerimientoDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoRequerimiento: data.codigoRequerimiento,
    codigoTicket: data.codigoTicket,
    nombreRequerimiento: data.nombreRequerimiento,
    descripcionRequerimiento: data.descripcionRequerimiento || '',
    estadoRequerimiento: data.estadoRequerimiento || 'PENDIENTE',

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  RequerimientoModel,
  RequerimientoDTO
};
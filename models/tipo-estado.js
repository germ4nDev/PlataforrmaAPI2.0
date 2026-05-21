/*
    Author: John Castañeda
    Refactored for: QPLUS DTO Pattern, Entity Standardization & Sequelize Syntax
*/
const { DataTypes } = require('sequelize');

const TipoEstadoModel = (sequelize) => {
  return sequelize.define('PTLTiposEstados', {
    tipoEstadoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoTipo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    tipoEstado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    nombreTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionEstado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
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
    tableName: 'PTLTiposEstados',
    timestamps: false
  });
};

const TipoEstadoDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    tipoEstado: data.tipoEstado || 0,
    nombreTipo: data.nombreTipo,
    descripcionEstado: data.descripcionEstado || '',
    estado: data.estado ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  TipoEstadoModel,
  TipoEstadoDTO
};
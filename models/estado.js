/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const EstadoModel = (sequelize) => {
  return sequelize.define('PTLEstados', {
    estadoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipoEstado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    nombreEstado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    siglaEstado: {
      type: DataTypes.STRING,
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
    tableName: 'PTLEstados',
    timestamps: false
  });
};

const EstadoDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    tipoEstado: data.tipoEstado || 0,
    nombreEstado: data.nombreEstado,
    siglaEstado: data.siglaEstado?.toUpperCase() || '', // Estandarizamos siglas a mayúsculas

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  EstadoModel,
  EstadoDTO
};
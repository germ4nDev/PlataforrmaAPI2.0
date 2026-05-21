/*
    Author: John Castañeda
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const ServidorModel = (sequelize) => {
  return sequelize.define('PTLServidor', {
    servidorId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoServidor: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombreServidor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionServidor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rutaServidor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccionIP: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoServidor: {
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
    tableName: 'PTLServidor',
    timestamps: false
  });
};

const ServidorDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoServidor: data.codigoServidor,
    nombreServidor: data.nombreServidor,
    descripcionServidor: data.descripcionServidor || '',
    rutaServidor: data.rutaServidor || '/',
    direccionIP: data.direccionIP || '0.0.0.0',
    estadoServidor: data.estadoServidor ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  ServidorModel,
  ServidorDTO
};
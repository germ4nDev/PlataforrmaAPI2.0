/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const EnlaceSTModel = (sequelize) => {
  return sequelize.define('PTLEnlacesST', {
    enlaceId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoEnlace: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoSitio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreEnlace: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionEnlace: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rutaEnlace: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoEnlace: {
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
    tableName: 'PTLEnlacesST',
    timestamps: false
  });
};

const EnlaceSTDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoEnlace: data.codigoEnlace,
    codigoSitio: data.codigoSitio,
    nombreEnlace: data.nombreEnlace,
    descripcionEnlace: data.descripcionEnlace || '',
    rutaEnlace: data.rutaEnlace,
    estadoEnlace: data.estadoEnlace ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  EnlaceSTModel,
  EnlaceSTDTO
};
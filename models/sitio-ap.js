/*
    Author: German Valencia
    Actualización: John Castañeda
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const SitioAPModel = (sequelize) => {
  return sequelize.define('PTLSitiosAP', {
    sitioId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoSitio: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoAplicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreSitio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionSitio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    urlSitio: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'http://localhost'
    },
    estadoSitio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    puertoSitio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 80
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
    tableName: 'PTLSitiosAP',
    timestamps: false
  });
};

const SitioAPDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoSitio: data.codigoSitio,
    codigoAplicacion: data.codigoAplicacion,
    nombreSitio: data.nombreSitio,
    descripcionSitio: data.descripcionSitio || '',
    urlSitio: data.urlSitio || 'http://localhost',
    puertoSitio: data.puertoSitio || 80,
    estadoSitio: data.estadoSitio ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  SitioAPModel,
  SitioAPDTO
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const VersionAPModel = (sequelize) => {
  return sequelize.define('PTLVersionesAP', {
    versionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoVersion: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoAplicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoVersion: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: 'PTLVersionesAP',
    timestamps: false
  });
};

const VersionAPDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoVersion: data.codigoVersion,
    codigoAplicacion: data.codigoAplicacion,
    nombreVersion: data.nombreVersion,
    version: data.version,
    fechaVersion: data.fechaVersion || fechaActual,
    descripcionVersion: data.descripcionVersion || 'Sin descripción detallada.',
    estadoVersion: data.estadoVersion ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  VersionAPModel,
  VersionAPDTO
};
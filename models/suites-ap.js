/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & Sequelize Syntax
*/
const { DataTypes } = require("sequelize");

const SuiteAPModel = (sequelize) => {
  return sequelize.define(
    "PTLSuitesAP",
    {
      suiteId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      codigoAplicacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codigoSuite: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nombreSuite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcionSuite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rutaInicio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      translateKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagenInicio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estadoSuite: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
    },
    {
      tableName: "PTLSuitesAP",
      timestamps: false,
    }
  );
};

const SuiteAPDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoAplicacion: data.codigoAplicacion,
    codigoSuite: data.codigoSuite,
    nombreSuite: data.nombreSuite,
    descripcionSuite: data.descripcionSuite || '',
    translateKey: data.translateKey || 'SUITE_DEFAULT',
    rutaInicio: data.rutaInicio || '/',
    imagenInicio: data.imagenInicio || 'no-imagen.png',
    estadoSuite: data.estadoSuite ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  SuiteAPModel,
  SuiteAPDTO
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & Collision Fix
*/
const { DataTypes } = require("sequelize");

const SuitePQModel = (sequelize) => {
  return sequelize.define(
    "PTLSuitesPQ",
    {
      suitePaqueteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigoPaquete: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codigoSuite: {
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
      tableName: "PTLSuitesPQ",
      timestamps: false,
    }
  );
};

const SuitePQDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoPaquete: data.codigoPaquete,
    codigoSuite: data.codigoSuite,
    estadoSuite: data.estadoSuite ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  SuitePQModel,
  SuitePQDTO
};
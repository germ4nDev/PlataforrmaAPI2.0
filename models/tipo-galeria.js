/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require("sequelize");

const TipoGaleriaModel = (sequelize) => {
  return sequelize.define(
    "PTLTiposGaleria",
    {
      tipoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      codigoTipo: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nombreTipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcionTipo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estadoTipo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      // AUDITORIA ------------
      codigoUsuarioCreacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaCreacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      codigoUsuarioModificacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaModificacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "PTLTiposGaleria",
      timestamps: false,
    }
  );
};

const TipoGaleriaDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoTipo: data.codigoTipo,
    nombreTipo: data.nombreTipo,
    descripcionTipo: data.descripcionTipo || '',
    estadoTipo: data.estadoTipo ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  TipoGaleriaModel,
  TipoGaleriaDTO
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const TipoItemModel = (sequelize) => {
  return sequelize.define('PTLTiposItem', {
    tipoItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombreTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoTipo: {
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
    tableName: 'PTLTiposItem',
    timestamps: false
  });
};

const TipoItemDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
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
  TipoItemModel,
  TipoItemDTO
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const ItemModel = (sequelize) => {
  return sequelize.define('PTLItems', {
    itemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoItem: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    tipoItemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombreItem: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valorUnitario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    costoValor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    descripcionValor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoValor: {
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
    tableName: 'PTLItems',
    timestamps: false
  });
};

const ItemDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoItem: data.codigoItem,
    tipoItemId: data.tipoItemId,
    nombreItem: data.nombreItem,

    valorUnitario: data.valorUnitario || 0,
    costoValor: data.costoValor || 0,

    descripcionValor: data.descripcionValor || '',
    estadoValor: data.estadoValor ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  ItemModel,
  ItemDTO
};
/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
      allowNull: false
    },
    costoValor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcionValor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoValor: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'PTLItems',
    timestamps: false
  });
};
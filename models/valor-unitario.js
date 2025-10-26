/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLValoresUnitarios', {
    valorUnitarioId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoValor: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    tipoValorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombreValor: {
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
      type: DataTypes.DATE,
      allowNull: false
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'PTLValoresUnitarios',
    timestamps: false
  });
};
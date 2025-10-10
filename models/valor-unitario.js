/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLValoresUnitarios', {
      valorUnitarioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigoValor: {
        type: DataTypes.STRING,
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
      }
    }, {
      tableName: 'PTLValoresUnitarios',
      timestamps: false
    });
  };
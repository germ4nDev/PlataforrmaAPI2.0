/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLTiposValor', {
      tipoValorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tipoValor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionTipo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoTipo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLTiposValor',
      timestamps: false
    });
  };
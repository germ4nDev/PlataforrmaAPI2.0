/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLEstados', {
      estadoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tipoEstado: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      nombreEstado: {
        type: DataTypes.STRING,
        allowNull: false
      },
      siglaEstado: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'PTLEstados',
      timestamps: false
    });
  };
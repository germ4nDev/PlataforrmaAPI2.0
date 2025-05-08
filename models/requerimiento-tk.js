/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLRequerimientosTK', {
      requerimientoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ticketId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      nombreRequerimiento: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionRequerimiento: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoRequerimiento: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLRequerimientosTK',
      timestamps: false
    });
  };
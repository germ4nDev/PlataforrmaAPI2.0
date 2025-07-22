/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLServidor', {
      servidorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombreServidor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionServidor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rutaServidor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoServidor: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'PTLServidor',
      timestamps: false
    });
  };
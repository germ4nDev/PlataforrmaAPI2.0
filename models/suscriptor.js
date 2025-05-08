/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLSuscriptores', {
      suscriptorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombreSuscriptor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionSuscriptor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoSuscriptor: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLSuscriptores',
      timestamps: false
    });
  };
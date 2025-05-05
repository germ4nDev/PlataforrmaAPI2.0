/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLSuscriptoresAP', {
      suscriptorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      tableName: 'PTLSuscriptoresAP',
      timestamps: false
    });
  };
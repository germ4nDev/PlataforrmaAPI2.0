/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLPaquetes', {
      paqueteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombrePaquete: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionPaquete: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoPaquete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      costoPaquete: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      precioPaquete: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      promocion: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      precioPromocion: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      acuerdoLicencia: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      tableName: 'PTLPaquetes',
      timestamps: false
    });
  };
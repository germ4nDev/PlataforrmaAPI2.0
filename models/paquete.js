/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLPaquetes', {
      paquetesId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigoPaquete: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombrePaquetes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionPaquetes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      acuerdoLicencia: {
        type: DataTypes.STRING,
        allowNull: false
      },
      costoPquete: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      precioPaquete: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      precioPromocion: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      promocion: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      estadoPaquetes: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      imagenPaquete: {
        type: DataTypes.STRING,
        default: ''
      },
      iconoPaquete: {
        type: DataTypes.STRING,
        default: ''
      },
      colorPaquete: {
        type: DataTypes.STRING,
        default: ''
      },
    }, {
      tableName: 'PTLPaquetes',
      timestamps: false
    });
  };
/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLSitiosAP', {
      sitioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombreSitio: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionSitio: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoSitio: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      urlSitio: {
        type: DataTypes.STRING,
        allowNull: false
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      puertoSitio: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'PTLSitiosAP',
      timestamps: false
    });
  };

/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLSeguimientosRQ', {
      seguimientoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      requerimientoId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      nombreSeguimiento: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionSeguimiento: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoSeguimiento: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLSeguimientosRQ',
      timestamps: false
    });
  };
/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLContenidosEL', {
      contenidoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      enlaceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nombreContenido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contenido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoContenido: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLContenidosEL',
      timestamps: false
    });
  };

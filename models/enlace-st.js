/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLEnlacesST', {
      enlaceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sitioId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nombreEnlace: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionEnlace: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rutaEnlace: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoEnlace: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLEnlacesST',
      timestamps: false
    });
  };

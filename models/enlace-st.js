/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLEnlacesST', {
      EnlaceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sitioId: {
        type: DataTypes.INTEGER,
        default: 0,
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

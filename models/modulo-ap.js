/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLModulosAP', {
      moduloId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      codigoModulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombreModulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionModulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoModulo: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
      }
    }, {
      tableName: 'PTLModulosAP',
      timestamps: false
    });
  };
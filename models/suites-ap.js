/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLSuitesAP', {
      suiteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      codigoSuite: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombreSuite: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionSuite: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoSuite: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
      }
    }, {
      tableName: 'PTLSuitesAP',
      timestamps: false
    });
  };
/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLPaqueteAplicaciones', {
      paqueteAplicacionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      paqueteId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      }
    }, {
      tableName: 'PTLPaqueteAplicaciones',
      timestamps: false
    });
  };
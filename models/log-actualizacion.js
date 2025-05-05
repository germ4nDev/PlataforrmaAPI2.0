/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLLogActualizacionesAP', {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      suscriptorId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      versionId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      descripcionLog: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      tableName: 'PTLLogActualizacionesAP',
      timestamps: false
    });
  };
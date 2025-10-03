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
      codigoAplicacion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      codigoVersion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fechaLog: {
        type: DataTypes.DATE,
        allowNull: false
      },
      descripcionLog: {
        type: DataTypes.STRING,
        allowNull: false
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
    }, {
      tableName: 'PTLLogActualizacionesAP',
      timestamps: false
    });
  };
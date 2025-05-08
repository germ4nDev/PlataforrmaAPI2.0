/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLLogTransaccionesAP', {
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
      fechaLogTransaccion: {
        type: DataTypes.DATE,
        allowNull: false
      },
      descripcionLog: {
        type: DataTypes.STRING,
        allowNull: false
      },
      codigoError: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mensajeError: {
        type: DataTypes.STRING,
        allowNull: false
      },
      usuarioGenerador: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'PTLLogTransaccionesAP',
      timestamps: false
    });
  };
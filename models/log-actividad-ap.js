/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLLogActividadesAP', {
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
      usuarioId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      fechaLogActividad: {
        type: DataTypes.DATE,
        allowNull: false
      },
      descripcionLog: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      tableName: 'PTLLogActividadesAP',
      timestamps: false
    });
  };
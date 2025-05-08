/*
    Author: German Valencia
    Actualizacion: John Castañeda
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
      versionId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      suscriptorId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      suscriptorVersionId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      usuarioActualizacion: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      fechaLogActualizacion: {
        type: DataTypes.DATE,
        allowNull: false
      },
    }, {
      tableName: 'PTLLogActualizacionesAP',
      timestamps: false
    });
  };
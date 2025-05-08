/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLEmpresasSC', {
      empresaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      suscriptorId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      nombreEmpresa: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionEmpresa: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoEmpresa: {
        type: DataTypes.BOOLEAN,
        default: false,
      }
    }, {
      tableName: 'PTLEmpresasSC',
      timestamps: false
    });
  };
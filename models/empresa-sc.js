/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLEmpresasST', {
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
      estadoUsuario: {
        type: DataTypes.BOOLEAN,
        default: false,
      }
    }, {
      tableName: 'PTLEmpresasST',
      timestamps: false
    });
  };
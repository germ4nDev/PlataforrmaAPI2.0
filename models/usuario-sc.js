/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLUsuariosST', {
      usuarioSTId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      suscriptorId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      estadoUsuario: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    }, {
      tableName: 'PTLUsuariosST',
      timestamps: false
    });
  };
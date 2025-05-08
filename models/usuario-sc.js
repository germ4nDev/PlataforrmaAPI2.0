/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLUsuariosSC', {
      usuarioSTId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      estadoUsuario: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    }, {
      tableName: 'PTLUsuariosSC',
      timestamps: false
    });
  };
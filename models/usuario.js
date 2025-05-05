/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLUsuariosAP', {
      usuarioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      identificacionUsuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombreUsuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      correoUsuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      correoUsuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      claveUsuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionUsuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fotoUsuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoUsuario: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    }, {
      tableName: 'PTLUsuarioAP',
      timestamps: false
    });
  };
/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLServidor', {
    servidorId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoServidor: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombreServidor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionServidor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rutaServidor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoServidor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'PTLServidor',
    timestamps: false
  });
};
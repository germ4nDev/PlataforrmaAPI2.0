/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLRequerimientosTK', {
    requerimientoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoRequerimiento: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreRequerimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionRequerimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoRequerimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'PTLRequerimientosTK',
    timestamps: false
  });
};
/*
    Author: German Valencia
    Actualización: German Valencia

*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLSeguimientosRQ', {
    seguimientoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigoRequerimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreSeguimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionSeguimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoSeguimiento: {
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
    tableName: 'PTLSeguimientosRQ',
    timestamps: false
  });
};
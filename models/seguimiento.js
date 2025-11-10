/*
    Author: German Valencia
    Actualización: German Valencia / 20251109
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLSeguimientosTK', {
    seguimientoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoSeguimiento: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaSeguimiento: {
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
    estadoTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capturaSeguimiento: {
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
    tableName: 'PTLSeguimientosTK',
    timestamps: false
  });
};
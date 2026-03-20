/*
    Author: German Valencia
    Model adjusted to match SQL Server schema (Screenshot 2026-03-14)
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLModulosPQ', {
    moduloPQId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoAplicacion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    codigoSuite: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    codigoModulo: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false
    },
    codigoPaquete: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    estadoModulo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fechaCreacion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fechaModificacion: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'PTLModulosPQ',
    timestamps: false
  });
};
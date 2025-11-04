/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLVersionesAP', {
    versionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoVersion: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoAplicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoVersion: {
      type: DataTypes.BOOLEAN,
      default: false
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
    tableName: 'PTLVersionesAP',
    timestamps: false
  });
};
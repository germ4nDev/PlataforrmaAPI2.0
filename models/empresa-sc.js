/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLEmpresasSC', {
    empresaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoEmpresaSC: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoSuscriptor: {
      type: DataTypes.STRING,
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
    tableName: 'PTLEmpresasSC',
    timestamps: false
  });
};
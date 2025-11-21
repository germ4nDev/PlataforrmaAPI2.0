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
    estadoEmpresa: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    logoEmpresa: {
      type: DataTypes.STRING,
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
    tableName: 'PTLEmpresasSC',
    timestamps: false
  });
};
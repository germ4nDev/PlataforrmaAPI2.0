/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

module.exports = (sequelize) => {
  return sequelize.define('PTLUsuariosRole', {
    usuarioRoleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigoUsuarioSC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoEmpresaSC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoRole: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoAplicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoSuite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipoRol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoUsuarioRole: {
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
    tableName: 'PTLUsuariosRole',
    timestamps: false
  });
};



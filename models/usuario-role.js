/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

module.exports = (sequelize) => {
  return sequelize.define('PTLUsuarioRoleAP', {
    usuarioRoleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigoUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoRole: {
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
    tableName: 'PTLUsuarioRoleAP',
    timestamps: false
  });
};



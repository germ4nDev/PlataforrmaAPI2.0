/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLRolesAP', {
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoRole: {
      type: DataTypes.STRING,
      primaryKey: true,
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
    nombreRole: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionRole: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoRole: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fechaCreacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fechaModificacion: {
      type: DataTypes.STRING  ,
      allowNull: true
    }
  }, {
    tableName: 'PTLRolesAP',
    timestamps: false
  });
};
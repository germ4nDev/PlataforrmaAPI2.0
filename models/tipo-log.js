/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLTiposLogs', {
    tipoLogId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    codigoTipoLog: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombreTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoRespuesta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoTipo: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'PTLTiposLogs',
    timestamps: false
  });
};
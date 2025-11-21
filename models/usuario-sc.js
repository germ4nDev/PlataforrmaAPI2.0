/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLUsuariosSC', {
    usuarioSCId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoUsuarioSC: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoUsuairo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoUsuarioSC: {
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
    tableName: 'PTLUsuariosSC',
    timestamps: false
  });
};
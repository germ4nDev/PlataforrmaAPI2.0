/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const UsuarioSCModel = (sequelize) => {
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
    codigoUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoUsuarioSC: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: 'PTLUsuariosSC',
    timestamps: false
  });
};

const UsuarioSCDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoUsuarioSC: data.codigoUsuarioSC,
    codigoUsuario: data.codigoUsuario,
    codigoSuscriptor: data.codigoSuscriptor,
    estadoUsuarioSC: data.estadoUsuarioSC ?? true,

    codigoUsuarioCreacion: data.codigoUsuarioAccion || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuarioAccion || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  UsuarioSCModel,
  UsuarioSCDTO
};
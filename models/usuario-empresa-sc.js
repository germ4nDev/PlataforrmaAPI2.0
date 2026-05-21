/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Multi-tenant Linkage & Typo Correction
*/
const { DataTypes } = require('sequelize');

const UsuarioEmpresaModel = (sequelize) => {
  return sequelize.define('PTLUsuariosEmpresasSC', {
    usuarioEmpresaSCId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoUsuarioEmpresaSC: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoUsuairoSC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoEmpresaSC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoUsuairoEmpresaSC: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'PTLUsuariosEmpresasSC',
    timestamps: false
  });
};

const UsuarioEmpresaDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoUsuarioEmpresaSC: data.codigoUsuarioEmpresaSC,
    codigoUsuarioSC: data.codigoUsuarioSC,
    codigoEmpresaSC: data.codigoEmpresaSC,
    estadoUsuarioEmpresaSC: data.estadoUsuarioEmpresaSC ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  UsuarioEmpresaModel,
  UsuarioEmpresaDTO
};
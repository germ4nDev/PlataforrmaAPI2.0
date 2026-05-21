/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, RBAC Standardization & Clean Code
*/
const { DataTypes } = require('sequelize');

const UsuarioRoleModel = (sequelize) => {
  return sequelize.define('PTLUsuariosRole', {
    usuarioRoleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoUsuarioRole: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
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
    estadoUsuarioRole: {
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
    tableName: 'PTLUsuariosRole',
    timestamps: false
  });
};

const UsuarioRoleDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoUsuarioRole: data.codigoUsuarioRole,
    codigoUsuarioSC: data.codigoUsuarioSC,
    codigoEmpresaSC: data.codigoEmpresaSC,
    codigoRole: data.codigoRole,
    estadoUsuarioRole: data.estadoUsuarioRole ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  UsuarioRoleModel,
  UsuarioRoleDTO
};
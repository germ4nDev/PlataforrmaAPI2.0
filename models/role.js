/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const RoleAPModel = (sequelize) => {
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
      allowNull: false,
      defaultValue: true
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
    tableName: 'PTLRolesAP',
    timestamps: false
  });
};

const RoleAPDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoRole: data.codigoRole,
    codigoAplicacion: data.codigoAplicacion,
    codigoSuite: data.codigoSuite,
    nombreRole: data.nombreRole,
    descripcionRole: data.descripcionRole || '', // Fallback para evitar errores de allowNull
    estadoRole: data.estadoRole ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  RoleAPModel,
  RoleAPDTO
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Identity Standardization & Security
*/
const { DataTypes } = require('sequelize');

const UsuarioModel = (sequelize) => {
  return sequelize.define('PTLUsuarios', {
    usuarioId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoUsuario: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    identificacionUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correoUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userNameUsuario: {
      type: DataTypes.STRING,
      unique: true
    },
    claveUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    fotoUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default-user.png'
    },
    usuarioAdministrador: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    estadoUsuario: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'PTLUsuarios',
    timestamps: false
  });
};

const UsuarioDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoUsuario: data.codigoUsuario,
    identificacionUsuario: data.identificacionUsuario,
    nombreUsuario: data.nombreUsuario?.toUpperCase() || '', // Estandarización a mayúsculas
    correoUsuario: data.correoUsuario?.toLowerCase() || '',
    userNameUsuario: data.userNameUsuario?.toLowerCase() || data.correoUsuario?.split('@')[0],
    claveUsuario: data.claveUsuario,
    descripcionUsuario: data.descripcionUsuario || '',
    fotoUsuario: data.fotoUsuario || 'default-user.png',
    usuarioAdministrador: data.usuarioAdministrador ?? false,
    estadoUsuario: data.estadoUsuario ?? true,

    codigoUsuarioCreacion: data.codigoUsuarioAccion || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuarioAccion || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  UsuarioModel,
  UsuarioDTO
};
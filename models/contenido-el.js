/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const ContenidoModel = (sequelize) => {
  return sequelize.define('PTLContenidosEL', {
    contenidoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoContenido: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoEnlace: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreContenido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionContenido: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoContenido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    tableName: 'PTLContenidosEL',
    timestamps: false
  });
};

const ContenidoDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoContenido: data.codigoContenido,
    codigoEnlace: data.codigoEnlace,
    nombreContenido: data.nombreContenido,
    descripcionContenido: data.descripcionContenido || '',
    contenido: data.contenido || '',
    estadoContenido: data.estadoContenido ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  ContenidoModel,
  ContenidoDTO
};
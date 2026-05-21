/*
    Author: German Valencia
    Actualización: German Valencia / 20251109
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const SeguimientoModel = (sequelize) => {
  return sequelize.define('PTLSeguimientosTK', {
    seguimientoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoSeguimiento: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoRequerimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreSeguimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaSeguimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionSeguimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoSeguimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'REGISTRADO'
    },
    estadoTicket: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'EN_REVISION'
    },
    capturaSeguimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'no-imagen.png'
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
    tableName: 'PTLSeguimientosTK',
    timestamps: false
  });
};

const SeguimientoDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoSeguimiento: data.codigoSeguimiento,
    codigoTicket: data.codigoTicket,
    codigoRequerimiento: data.codigoRequerimiento,
    nombreSeguimiento: data.nombreSeguimiento,
    fechaSeguimiento: data.fechaSeguimiento || fechaActual,
    descripcionSeguimiento: data.descripcionSeguimiento || '',
    estadoSeguimiento: data.estadoSeguimiento || 'REGISTRADO',
    estadoTicket: data.estadoTicket || 'EN_REVISION',
    capturaSeguimiento: data.capturaSeguimiento || 'no-imagen.png',

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  SeguimientoModel,
  SeguimientoDTO
};
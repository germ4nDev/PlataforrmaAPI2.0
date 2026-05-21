/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization (i18n)
*/
const { DataTypes } = require('sequelize');

const TextoIDModel = (sequelize) => {
  return sequelize.define('PTLTextosID', {
    textoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idiomaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anclaTexto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    textoValor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoTexto: {
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
    tableName: 'PTLTextosID',
    timestamps: false
  });
};

const TextoIDDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    idiomaId: data.idiomaId,
    anclaTexto: data.anclaTexto?.trim() || 'CLAVE_HUÉRFANA',
    textoValor: data.textoValor || '',
    estadoTexto: data.estadoTexto ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  TextoIDModel,
  TextoIDDTO
};
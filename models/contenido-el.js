/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
      allowNull: false
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoContenido: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'PTLContenidosEL',
    timestamps: false
  });
};

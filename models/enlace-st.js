/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLEnlacesST', {
    enlaceId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoEnlace: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoSitio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreEnlace: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionEnlace: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rutaEnlace: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoEnlace: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'PTLEnlacesST',
    timestamps: false
  });
};

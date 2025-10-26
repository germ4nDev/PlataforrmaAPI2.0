/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLModulosAP', {
    moduloId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoModulo: {
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
    codigoPadre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreModulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precioModulo: {
      type: DataTypes.NUMBER,
      default: 0,
      allowNull: false
    },
    rutaModulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionModulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hijos: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    translateKey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoModulo: {
      type: DataTypes.BOOLEAN,
      default: false,
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
    tableName: 'PTLModulosAP',
    timestamps: false
  });
};
/*
    Author: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLTiposItem', {
    tipoItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombreTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoTipo: {
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
    tableName: 'PTLTiposItem',
    timestamps: false
  });
};
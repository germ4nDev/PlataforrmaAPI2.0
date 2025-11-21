/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLSitiosAP', {
    sitioId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoSitio: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigoAplicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreSitio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionSitio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    urlSitio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoSitio: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    puertoSitio: {
      type: DataTypes.INTEGER,
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
    tableName: 'PTLSitiosAP',
    timestamps: false
  });
};

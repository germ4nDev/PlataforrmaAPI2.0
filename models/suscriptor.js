/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLSuscriptores', {
    suscriptorId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoSuscriptor: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    identificacionSuscriptor: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    nombreSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dereccionSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefonoContacto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numeroEmpresas: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    numeroUsuarios: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    usuarioAdministrador: {
      type: DataTypes.STRING,
      allowNull: false
    },
    claveAdministrador: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logoSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcionSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    envioCorreosSuscriptor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    envioMensajesSuscriptor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    envioPublicidadSuscriptor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    estadoSuscriptor: {
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
    tableName: 'PTLSuscriptores',
    timestamps: false
  });
};
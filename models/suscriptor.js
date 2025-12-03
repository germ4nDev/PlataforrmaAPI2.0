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
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correoSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccionSuscriptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefonoContacto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numeroEmpresas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numeroUsuarios: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    codigoAdministrador: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuarioAdministrador: {
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
    tableName: 'PTLSuscriptores',
    timestamps: false
  });
};
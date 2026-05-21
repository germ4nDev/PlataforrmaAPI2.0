/*
    Author: German Valencia
    Actualización: John Castañeda
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require("sequelize");

const SuscriptorModel = (sequelize) => {
  return sequelize.define(
    "PTLSuscriptores",
    {
      suscriptorId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      codigoSuscriptor: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      identificacionSuscriptor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombreSuscriptor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correoSuscriptor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccionSuscriptor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefonoContacto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numeroEmpresas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      numeroUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      codigoAdministrador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usuarioAdministrador: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      logoSuscriptor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descripcionSuscriptor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      envioCorreosSuscriptor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      envioMensajesSuscriptor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      envioPublicidadSuscriptor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      estadoSuscriptor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      // AUDITORIA ------------
      codigoUsuarioCreacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaCreacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      codigoUsuarioModificacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaModificacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "PTLSuscriptores",
      timestamps: false,
    }
  );
};

const SuscriptorDTO = (data) => {
  const fechaActual = new Date().toISOString();

  return {
    codigoSuscriptor: data.codigoSuscriptor,
    identificacionSuscriptor: data.identificacionSuscriptor,
    nombreSuscriptor: data.nombreSuscriptor,
    correoSuscriptor: data.correoSuscriptor?.toLowerCase() || '',
    direccionSuscriptor: data.direccionSuscriptor || '',
    telefonoContacto: data.telefonoContacto || '',
    descripcionSuscriptor: data.descripcionSuscriptor || '',
    logoSuscriptor: data.logoSuscriptor || 'no-imagen.png',
    numeroEmpresas: data.numeroEmpresas || 1,
    numeroUsuarios: data.numeroUsuarios || 1,
    codigoAdministrador: data.codigoAdministrador,
    usuarioAdministrador: data.usuarioAdministrador || '',
    envioCorreosSuscriptor: data.envioCorreosSuscriptor ?? true,
    envioMensajesSuscriptor: data.envioMensajesSuscriptor ?? false,
    envioPublicidadSuscriptor: data.envioPublicidadSuscriptor ?? false,
    estadoSuscriptor: data.estadoSuscriptor ?? true,

    codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
    fechaCreacion: data.fechaCreacion || fechaActual,
    codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
    fechaModificacion: fechaActual
  };
};

module.exports = {
  SuscriptorModel,
  SuscriptorDTO
};
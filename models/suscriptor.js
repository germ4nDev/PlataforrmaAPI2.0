/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
      },
      numeroUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      },
      envioMensajesSuscriptor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      envioPublicidadSuscriptor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      estadoSuscriptor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
    },
  );
};
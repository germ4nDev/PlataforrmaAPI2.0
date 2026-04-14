/*
    Author: German Valencia
*/
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "PTLBiblioteca",
    {
      bibliotecaId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      codigoBiblioteca: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nombreBiblioteca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcionBiblioteca: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      codigoAplicacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estadoBiblioteca: {
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
      tableName: "PTLBiblioteca",
      timestamps: false,
    },
  );
};

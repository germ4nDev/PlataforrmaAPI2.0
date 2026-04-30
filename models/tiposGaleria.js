/*
    Author: German Valencia
*/
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "PTLTiposGaleria",
    {
      tipoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      codigoTipo: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nombreTipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcionTipo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estadoTipo: {
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
      tableName: "PTLTiposGaleria",
      timestamps: false,
    },
  );
};

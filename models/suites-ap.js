/*
    Author: German Valencia
*/
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "PTLSuitesAP",
    {
      suiteId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      codigoAplicacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codigoSuite: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nombreSuite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcionSuite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rutaInicio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      translateKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagenInicio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estadoSuite: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
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
    },
    {
      tableName: "PTLSuitesAP",
      timestamps: false,
    }
  );
};


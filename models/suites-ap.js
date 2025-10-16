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
        primaryKey: true,
        autoIncrement: true,
      },
      codigoAplicacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codigoSuite: {
        type: DataTypes.STRING,
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
      estadoSuite: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
      },
      imagenInicio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "PTLSuitesAP",
      timestamps: false,
    }
  );
};

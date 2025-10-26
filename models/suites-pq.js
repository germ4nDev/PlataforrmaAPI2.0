/*
    Author: German Valencia
*/
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "PTLSuitesAP",
    {
      suitePqueteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigoPaquete: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codigoSuite: {
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
    },
    {
      tableName: "PTLSuitesAP",
      timestamps: false,
    }
  );
};


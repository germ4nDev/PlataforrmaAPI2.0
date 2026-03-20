/*
    Author: German Valencia
    Model adjusted to match SQL Server schema (Screenshot 2026-03-14)
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLItemsPaquete', {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigoItem: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false
    },
    codigoPaquete: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    codigoValor: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    nombreItem: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    descripcionItem: {
      type: DataTypes.STRING(4000),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valorUnitario: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
    },
    valorTotal: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
    },
    valoresAdicionales: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
    },
    estadoItem: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fechaCreacion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fechaModificacion: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'PTLItemsPaquete',
    timestamps: false
  });
};
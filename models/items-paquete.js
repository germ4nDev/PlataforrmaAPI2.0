/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLItemsPaquete', {
    itemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoItem: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codigpPaquete: {
      type: DataTypes.STRING,
      default: '',
      allowNull: false
    },
    codigpValor: {
      type: DataTypes.STRING,
      default: '',
      allowNull: false
    },
    descripcionItem: {
      type: DataTypes.STRING,
      default: '',
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: false
    },
    valorUnitario: {
      type: DataTypes.DECIMAL,
      default: 0.00,
      allowNull: false
    },
    valorTotal: {
      type: DataTypes.DECIMAL,
      default: 0.00,
      allowNull: false
    },
    valoresAdicionales: {
      type: DataTypes.DECIMAL,
      default: 0.00,
      allowNull: false
    },
    estadoItem: {
      type: DataTypes.BOOLEAN,
      default: false,
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
    tableName: 'PTLItemsPaquete',
    timestamps: false
  });
};
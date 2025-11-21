/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLLogTransaccionesAP', {
    logId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigoAplicacin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoSuite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoModulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: false
    },
    codigoErrr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaLog: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descripcionLog: {
      type: DataTypes.STRING,
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
    tableName: 'PTLLogTransaccionesAP',
    timestamps: false
  });
};
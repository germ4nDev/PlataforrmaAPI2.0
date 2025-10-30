/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLLogActividadesAP', {
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
    codigoRespuesta: {
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
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'PTLLogActividadesAP',
    timestamps: false
  });
};


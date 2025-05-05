/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLUsuariosEmpresa', {
      usuarioEmpresaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      empresaId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'PTLUsuariosEmpresa',
      timestamps: false
    });
  };

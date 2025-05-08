/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLUsuariosEmpresaSC', {
      usuarioEmpresaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuarioSTId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      },
      empresaId: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false
      }
    }, {
      tableName: 'PTLUsuariosEmpresaSC',
      timestamps: false
    });
  };

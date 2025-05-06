/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLTextosID', {
      textoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idiomaId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      anclaTexto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      textoValor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoTexto: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLTextosID',
      timestamps: false
    });
  };
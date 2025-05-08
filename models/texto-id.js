/*
    Author: German Valencia
    Actualización: John Castañeda
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
      ancla: {
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
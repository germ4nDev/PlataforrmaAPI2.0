/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLIdiomas', {
      idiomaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      siglaIdioma: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombreIdioma: {
        type: DataTypes.STRING,
        allowNull: false
      },
      flagIdioma: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoIdioma: {
        type: DataTypes.BOOLEAN,
        default: false,
      }
    }, {
      tableName: 'PTLIdiomas',
      timestamps: false
    });
  };
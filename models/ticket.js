/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLTicketsAP', {
      ticketId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      aplicacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      usuarioSenderId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nombreTicket: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcionTicket: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estadoTicket: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'PTLTicketsAP',
      timestamps: false
    });
  };
/*
    Author: German Valencia
    Actualización: John Castañeda
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
        default: 0,
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
      },
      usuarioSenderId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'PTLTicketsAP',
      timestamps: false
    });
  };
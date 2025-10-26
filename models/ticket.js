/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PTLTicketsAP', {
    ticketId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    codigoTicket: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    codioAplicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigosuite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoModulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombreTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoUsuarioSender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoUsuarioAsignado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaAsignacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    prioridad: {
      type: DataTypes.NUMBER,
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
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'PTLTicketsAP',
    timestamps: false
  });
};
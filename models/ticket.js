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
      allowNull: true
    },
    codigosuite: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigoModulo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nombreTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoUsuarioSender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigoUsuarioAsignado: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fechaAsignacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    prioridad: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    colorPrioridad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcionTicket: {
      type: DataTypes.STRING,
      allowNull: true
    },
    definicionRequerimiento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    capturaTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estadoTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // AUDITORIA ------------
    codigoUsuarioCreacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    codigoUsuarioModificacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'PTLTicketsAP',
    timestamps: false
  });
};
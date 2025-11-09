/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');
const { getClaseTicketById } = require('../controllers/clases-ticket');

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
        codigoAplicacion: {
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
        codigoClase: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaTicket: {
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
            type: DataTypes.STRING,
            allowNull: false
        },
        prioridad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colorPrioridad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionTicket: {
            type: DataTypes.STRING,
            allowNull: false
        },
        definicionRequerimiento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capturaTicket: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoTicket: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoUsuarioCreacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaCreacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoUsuarioModificacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaModificacion: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'PTLTicketsAP',
        timestamps: false
    });
};
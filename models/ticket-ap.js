/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & Clean Architecture
*/
const { DataTypes } = require('sequelize');

const TicketAPModel = (sequelize) => {
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
            allowNull: false,
            defaultValue: 'SIN_ASIGNAR'
        },
        fechaAsignacion: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'PENDIENTE'
        },
        prioridad: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'NORMAL'
        },
        colorPrioridad: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '#808080'
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
            allowNull: false,
            defaultValue: 'no-imagen.png'
        },
        estadoTicket: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ABIERTO'
        },
        // AUDITORIA ------------
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

const TicketAPDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoTicket: data.codigoTicket,
        codigoAplicacion: data.codigoAplicacion,
        codigoSuite: data.codigoSuite,
        codigoModulo: data.codigoModulo,
        codigoClase: data.codigoClase,
        fechaTicket: data.fechaTicket || fechaActual,
        nombreTicket: data.nombreTicket,
        codigoUsuarioSender: data.codigoUsuarioSender,
        codigoUsuarioAsignado: data.codigoUsuarioAsignado || 'SIN_ASIGNAR',
        fechaAsignacion: data.fechaAsignacion || (data.codigoUsuarioAsignado ? fechaActual : 'PENDIENTE'),
        prioridad: data.prioridad || 'NORMAL',
        colorPrioridad: data.colorPrioridad || '#808080',
        descripcionTicket: data.descripcionTicket || '',
        definicionRequerimiento: data.definicionRequerimiento || '',
        capturaTicket: data.capturaTicket || 'no-imagen.png',
        estadoTicket: data.estadoTicket || 'ABIERTO',

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    TicketAPModel,
    TicketAPDTO
};
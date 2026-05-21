/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const ClaseTicketModel = (sequelize) => {
    return sequelize.define('PTLClasesTicket', {
        claseTicketId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoClase: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        claseTicket: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionClase: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoClase: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
            allowNull: false
        }
    }, {
        tableName: 'PTLClasesTicket',
        timestamps: false
    });
};

const ClaseTicketDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoClase: data.codigoClase,
        claseTicket: data.claseTicket,
        descripcionClase: data.descripcionClase || '',
        estadoClase: data.estadoClase ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    ClaseTicketModel,
    ClaseTicketDTO
};
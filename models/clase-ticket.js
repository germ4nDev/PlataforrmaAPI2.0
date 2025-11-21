/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
            allowNull: false
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
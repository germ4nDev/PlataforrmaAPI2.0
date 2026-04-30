/*
    Author: Juan Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLScripts', {
        scriptId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        codigoScript: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        nombreScript: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionScript: {
            type: DataTypes.STRING,
            allowNull: true
        },
        codigoTipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoScript: {
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
        tableName: 'PTLScripts',
        timestamps: false
    });
};
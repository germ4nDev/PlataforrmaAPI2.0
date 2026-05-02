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
        codigoTipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombreScript: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionScript: {
            type: DataTypes.STRING,
            allowNull: true
        },
        descripcionScript: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estadoScript: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        // AUDITORIA ------------
        codigoUsuarioCreacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fechaCreacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        codigoUsuarioModificacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fechaModificacion: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'PTLScripts',
        timestamps: false
    });
};
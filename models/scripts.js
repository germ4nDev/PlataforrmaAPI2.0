/*
    Author: Juan Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const ScriptModel = (sequelize) => {
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
        estadoScript: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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

const ScriptDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoScript: data.codigoScript,
        codigoTipo: data.codigoTipo,
        codigoAplicacion: data.codigoAplicacion,
        nombreScript: data.nombreScript,
        descripcionScript: data.descripcionScript || '',
        estadoScript: data.estadoScript ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    ScriptModel,
    ScriptDTO
};
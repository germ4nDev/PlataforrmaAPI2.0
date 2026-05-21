/*
    Author: Juan Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const TipoScriptModel = (sequelize) => {
    return sequelize.define('PTLTiposScripts', {
        tipoScriptId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        codigoTipo: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        nombreTipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionTipo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estadoTipo: {
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
        tableName: 'PTLTiposScripts',
        timestamps: false
    });
};

const TipoScriptDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoTipo: data.codigoTipo,
        nombreTipo: data.nombreTipo,
        descripcionTipo: data.descripcionTipo || '',
        estadoTipo: data.estadoTipo ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    TipoScriptModel,
    TipoScriptDTO
};
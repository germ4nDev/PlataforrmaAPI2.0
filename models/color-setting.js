/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const ColorSettingsModel = (sequelize) => {
    return sequelize.define('PTLColorSettings', {
        colorNavId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        navbarColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        textoColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        iconosColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        buttonsHoverColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoColor: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
            allowNull: false
        }
    }, {
        tableName: 'PTLColorSettings',
        timestamps: false
    });
};

const ColorSettingsDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        navbarColor: data.navbarColor,
        textoColor: data.textoColor,
        iconosColor: data.iconosColor,
        buttonsHoverColor: data.buttonsHoverColor,
        estadoColor: data.estadoColor ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    ColorSettingsModel,
    ColorSettingsDTO
};
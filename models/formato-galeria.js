/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require("sequelize");

const FormatoGaleriaModel = (sequelize) => {
    return sequelize.define(
        "PTLFormatosGaleria", {
        formatoId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        codigoFormato: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        codigoTipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombreFormato: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcionFormato: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estadoFormato: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        // AUDITORIA ------------
        codigoUsuarioCreacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fechaCreacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        codigoUsuarioModificacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fechaModificacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "PTLFormatosGaleria",
        timestamps: false,
    },
    );
};

const FormatoGaleriaDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoFormato: data.codigoFormato?.toLowerCase() || '', // Estandarizamos extensiones a minúsculas
        codigoTipo: data.codigoTipo,
        nombreFormato: data.nombreFormato,
        descripcionFormato: data.descripcionFormato || '',
        estadoFormato: data.estadoFormato ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    FormatoGaleriaModel,
    FormatoGaleriaDTO
};
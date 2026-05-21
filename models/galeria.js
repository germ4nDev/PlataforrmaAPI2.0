/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require("sequelize");

const GaleriaModel = (sequelize) => {
    return sequelize.define(
        "PTLGaleria", {
        galeriaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        codigoGaleria: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        codigoTipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombreGaleria: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codigoFormato: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcionGaleria: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imagenGaleria: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estadoGaleria: {
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
        tableName: "PTLGaleria",
        timestamps: false,
    },
    );
};

const GaleriaDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoGaleria: data.codigoGaleria,
        codigoTipo: data.codigoTipo,
        nombreGaleria: data.nombreGaleria,
        codigoFormato: data.codigoFormato,
        descripcionGaleria: data.descripcionGaleria || '',
        imagenGaleria: data.imagenGaleria || 'no-imagen.png',
        estadoGaleria: data.estadoGaleria ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    GaleriaModel,
    GaleriaDTO
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const AplicacionModel = (sequelize) => {
    return sequelize.define('PTLAplicaciones', {
        aplicacionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        nombreAplicacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionAplicacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estadoAplicacion: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        translateKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagenInicio: {
            type: DataTypes.STRING,
            allowNull: true
        },
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
        },
    }, {
        tableName: 'PTLAplicaciones',
        timestamps: false
    });
};

const AplicacionDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoAplicacion: data.codigoAplicacion,
        nombreAplicacion: data.nombreAplicacion,
        descripcionAplicacion: data.descripcionAplicacion || '',
        estadoAplicacion: data.estadoAplicacion ?? true,
        translateKey: data.translateKey,
        imagenInicio: data.imagenInicio || 'no-imagen.png',
        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    AplicacionModel,
    AplicacionDTO
};
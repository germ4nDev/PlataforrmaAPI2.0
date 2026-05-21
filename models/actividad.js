/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const ActividadModel = (sequelize) => {
    return sequelize.define('PTLActividades', {
        actividadId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoActividad: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoSuite: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoModulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        actividad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estadoActividad: {
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
        tableName: 'PTLActividades',
        timestamps: false
    });
};

const ActividadDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoActividad: data.codigoActividad,
        codigoAplicacion: data.codigoAplicacion,
        codigoSuite: data.codigoSuite,
        codigoModulo: data.codigoModulo,
        actividad: data.actividad,
        descripcion: data.descripcion,
        estadoActividad: data.estadoActividad ?? true,
        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    ActividadModel,
    ActividadDTO
};
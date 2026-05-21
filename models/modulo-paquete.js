/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & SQL Server precision
*/
const { DataTypes } = require('sequelize');

const ModuloPQModel = (sequelize) => {
    return sequelize.define('PTLModulosPQ', {
        moduloPQId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoModuloPQ: {
            type: DataTypes.STRING(200),
            primaryKey: true,
            allowNull: false
        },
        codigoAplicacion: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        codigoSuite: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        codigoModulo: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        codigoPaquete: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        estadoModuloPQ: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        // AUDITORIA ------------
        codigoUsuarioCreacion: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        fechaCreacion: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        codigoUsuarioModificacion: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        fechaModificacion: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        tableName: 'PTLModulosPQ',
        timestamps: false
    });
};

const ModuloPQDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoModuloPQ: data.codigoModuloPQ,
        codigoAplicacion: data.codigoAplicacion,
        codigoSuite: data.codigoSuite,
        codigoModulo: data.codigoModulo,
        codigoPaquete: data.codigoPaquete,
        estadoModuloPQ: data.estadoModuloPQ ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    ModuloPQModel,
    ModuloPQDTO
};
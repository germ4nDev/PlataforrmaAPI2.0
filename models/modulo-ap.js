/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & Sequelize Syntax
*/
const { DataTypes } = require('sequelize');

const ModuloAPModel = (sequelize) => {
    return sequelize.define('PTLModulosAP', {
        moduloId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoModulo: {
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
        codigoPadre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombreModulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precioModulo: {
            type: DataTypes.DECIMAL(18, 2),
            defaultValue: 0,
            allowNull: false
        },
        rutaModulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionModulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hijos: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        translateKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoModulo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
        tableName: 'PTLModulosAP',
        timestamps: false
    });
};

const ModuloAPDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoModulo: data.codigoModulo,
        codigoAplicacion: data.codigoAplicacion,
        codigoSuite: data.codigoSuite,
        codigoPadre: data.codigoPadre || '',
        nombreModulo: data.nombreModulo,
        precioModulo: data.precioModulo || 0,
        rutaModulo: data.rutaModulo || '',
        descripcionModulo: data.descripcionModulo || '',
        hijos: data.hijos ?? false,
        icon: data.icon || 'default-icon',
        translateKey: data.translateKey,
        estadoModulo: data.estadoModulo ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    ModuloAPModel,
    ModuloAPDTO
};
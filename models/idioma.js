/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const IdiomaModel = (sequelize) => {
    return sequelize.define('PTLIdiomas', {
        idiomaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoIdioma: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        siglaIdioma: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombreIdioma: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flagIdioma: {
            type: DataTypes.STRING,
            allowNull: false
        },
        translateKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoIdioma: {
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
        tableName: 'PTLIdiomas',
        timestamps: false
    });
};

const IdiomaDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoIdioma: data.codigoIdioma,
        siglaIdioma: data.siglaIdioma?.toLowerCase() || '', // Estandarizamos siglas (ej: 'en', 'es')
        nombreIdioma: data.nombreIdioma,
        flagIdioma: data.flagIdioma || 'default-flag.png',
        translateKey: data.translateKey,
        estadoIdioma: data.estadoIdioma ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    IdiomaModel,
    IdiomaDTO
};
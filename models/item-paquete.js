/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern, Entity Standardization & SQL Server precision
*/
const { DataTypes } = require('sequelize');

const ItemPaqueteModel = (sequelize) => {
    return sequelize.define('PTLItemsPaquete', {
        itemId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoItem: {
            type: DataTypes.STRING(200),
            primaryKey: true,
            allowNull: false
        },
        codigoPaquete: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        codigoValor: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        tipoValorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombreItem: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        descripcionItem: {
            type: DataTypes.STRING(4000),
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        valorUnitario: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        valorTotal: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        valoresAdicionales: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        estadoItem: {
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
        tableName: 'PTLItemsPaquete',
        timestamps: false
    });
};

const ItemPaqueteDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoItem: data.codigoItem,
        codigoPaquete: data.codigoPaquete,
        codigoValor: data.codigoValor,
        tipoValorId: data.tipoValorId,
        nombreItem: data.nombreItem,
        descripcionItem: data.descripcionItem || '',
        cantidad: data.cantidad || 1,
        valorUnitario: data.valorUnitario || 0,
        valorTotal: data.valorTotal || 0,
        valoresAdicionales: data.valoresAdicionales || 0,
        estadoItem: data.estadoItem ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    ItemPaqueteModel,
    ItemPaqueteDTO
};
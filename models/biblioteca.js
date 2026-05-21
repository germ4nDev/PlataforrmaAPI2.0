/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require("sequelize");

const BibliotecaModel = (sequelize) => {
    return sequelize.define(
        "PTLBibliotecas", {
        bibliotecaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        codigoBiblioteca: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        nombreBiblioteca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcionBiblioteca: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagenBiblioteca: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estadoBiblioteca: {
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
        tableName: "PTLBibliotecas",
        timestamps: false,
    },
    );
};

const BibliotecaDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoBiblioteca: data.codigoBiblioteca,
        nombreBiblioteca: data.nombreBiblioteca,
        descripcionBiblioteca: data.descripcionBiblioteca || '',
        codigoAplicacion: data.codigoAplicacion,
        imagenBiblioteca: data.imagenBiblioteca || 'no-imagen.png',
        estadoBiblioteca: data.estadoBiblioteca ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    BibliotecaModel,
    BibliotecaDTO
};
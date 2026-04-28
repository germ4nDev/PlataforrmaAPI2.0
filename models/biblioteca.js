/*
    Author: German Valencia
*/
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("PTLBiblioteca", {
        bibliotecaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        codigoBiblioteca: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codigoSuite: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codigoModulo: {
            type: DataTypes.STRING,
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
        imagenBiblioteca: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estadoBiblioteca: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
    }, );
};
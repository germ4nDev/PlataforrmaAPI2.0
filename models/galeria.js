/*
    Author: German Valencia
*/
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "PTLGalerias", {
            galeriaId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
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
            codigoBiblioteca: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            codigoSuite: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            codigoModulo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            siglaIdioma: {
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
            fotoGaleria: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            mediaGaleria: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            estadoGaleria: {
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
            tableName: "PTLGalerias",
            timestamps: false,
        },
    );
};
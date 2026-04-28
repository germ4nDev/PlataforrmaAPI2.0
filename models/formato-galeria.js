/*
    Author: German Valencia
*/
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "PTLFormatosGaleria", {
            formatoId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            codigoFormato: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            codigoTipo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nombreFormato: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcionFormato: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            estadoFormato: {
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
            tableName: "PTLFormatosGaleria",
            timestamps: false,
        },
    );
};
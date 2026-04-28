/*
    Author: German Valencia
*/
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("PTLBiblioteca", {
        bibliotecaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            field: 'bibliotecaId'
        },
        codigoBiblioteca: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            field: 'codigoBiblioteca'
        },
        nombreBiblioteca: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'nombreBiblioteca'
        },
        descripcionBiblioteca: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'descripcionBiblioteca'
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'codigoAplicacion'
        },
        imagenBiblioteca: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'imagenBiblioteca'
        },
        estadoBiblioteca: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'estadoBiblioteca'
        },
        // AUDITORIA ------------
        codigoUsuarioCreacion: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'codigoUsuarioCreacion'
        },
        fechaCreacion: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'fechaCreacion'
        },
        codigoUsuarioModificacion: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'codigoUsuarioModificacion'
        },
        fechaModificacion: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'fechaModificacion'
        },
    }, {
        tableName: "PTLBibliotecas",
        timestamps: false,
    }, );
};
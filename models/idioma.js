/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
        tableName: 'PTLIdiomas',
        timestamps: false
    });
};
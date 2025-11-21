/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLColorSettings', {
        colorNavId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        navbarColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        textoColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        iconosColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        buttonsHoverColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoColor: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        codigoUsuarioCreacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaCreacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoUsuarioModificacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaModificacion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'PTLColorSettings',
        timestamps: false
    });
};
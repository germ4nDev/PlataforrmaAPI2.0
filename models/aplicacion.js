/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLAplicaciones', {
        aplicacionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        nombreAplicacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionAplicacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estadoAplicacion: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        translateKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagenInicio: {
            type: DataTypes.STRING,
            allowNull: true
        },
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
        },
    }, {
        tableName: 'PTLAplicaciones',
        timestamps: false
    });
};
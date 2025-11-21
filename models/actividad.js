/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLActividades', {
        actividadId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoActividad: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoSuite: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoModulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        actividad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoActividad: {
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
        tableName: 'PTLActividades',
        timestamps: false
    });
};
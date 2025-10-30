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
            allowNull: false
        },
        translateKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoAplicacion: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        imagenInicio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoUsuarioCreacion: {
            type: DataTypes.STRING
        },
        fechaCreacion: {
            type: DataTypes.DATE
        },
        codigoUsuarioModificacion: {
            type: DataTypes.STRING
        },
        fechaModificacion: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'PTLAplicaciones',
        timestamps: false
    });
};
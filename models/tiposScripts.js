/*
    Author: Juan Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLTiposScripts', {
        tipoScriptId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        codigoTipo: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        nombreTipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionTipo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estadoTipo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        // AUDITORIA ------------
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
        tableName: 'PTLTiposScripts',
        timestamps: false
    });
};
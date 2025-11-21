/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLActividadesRoles', {
        actividadRoleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigoActividad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoRole: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permiso: {
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
        tableName: 'PTLActividadesRoles',
        timestamps: false
    });
};
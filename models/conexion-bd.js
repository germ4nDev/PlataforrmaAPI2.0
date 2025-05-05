/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLConexionesBD', {
        conexionId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        aplicacionId: {
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: false
        },
        suscriptorId: {
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: false
        },
        nombreConexion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionConexion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoConexion: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        nombreServidor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BDNombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BDUser: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BDPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BDPort: {
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: false
        }
        }, {
        tableName: 'PTLConexionesBD',
        timestamps: false
    });
};
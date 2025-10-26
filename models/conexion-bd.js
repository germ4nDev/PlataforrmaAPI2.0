/*
    Author: German Valencia
    Actualización: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLConexionesBD', {
        conexionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        codigoConexion: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        codigoSuscriptor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoPaquete: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigoAplicacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombreConexion: {
            type: DataTypes.STRING,
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
        },
        descripcionConexion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoConexion: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        // AUDITORIA ------------
        codigoUsuarioCreacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaCreacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        codigoUsuarioModificacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaModificacion: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'PTLConexionesBD',
        timestamps: false
    });
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const ConexionesBDModel = (sequelize) => {
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
            defaultValue: 0,
            allowNull: false
        },
        descripcionConexion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoConexion: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
        tableName: 'PTLConexionesBD',
        timestamps: false
    });
};

const ConexionesBDDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        codigoConexion: data.codigoConexion,
        codigoSuscriptor: data.codigoSuscriptor,
        codigoPaquete: data.codigoPaquete,
        codigoAplicacion: data.codigoAplicacion,
        nombreConexion: data.nombreConexion,
        nombreServidor: data.nombreServidor,
        BDNombre: data.BDNombre,
        BDUser: data.BDUser,
        BDPassword: data.BDPassword,
        BDPort: data.BDPort || 0,
        descripcionConexion: data.descripcionConexion || '',
        estadoConexion: data.estadoConexion ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    ConexionesBDModel,
    ConexionesBDDTO
};
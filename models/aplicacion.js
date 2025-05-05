/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLAplicaciones', {
            aplicacionId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombreAplicacion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descripcionAplicacion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            estadoAplicacion: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            codigoAplicacion: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
        tableName: 'PTLAplicaciones',
        timestamps: false
    });
};
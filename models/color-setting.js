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
            }
        }, {
        tableName: 'PTLColorSettings',
        timestamps: false
    });
};
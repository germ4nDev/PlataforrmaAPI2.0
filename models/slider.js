/*
    Author: German Valencia
*/
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PTLSliderInicio', {
        sliderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreSlider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        urlSlider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcionSlider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoSlider: {
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
        tableName: 'PTLSliderInicio',
        timestamps: false
    });
};
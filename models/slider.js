/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & Entity Standardization
*/
const { DataTypes } = require('sequelize');

const SliderInicioModel = (sequelize) => {
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
            allowNull: false,
            defaultValue: 'no-imagen.png'
        },
        descripcionSlider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoSlider: {
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
        tableName: 'PTLSliderInicio',
        timestamps: false
    });
};

const SliderInicioDTO = (data) => {
    const fechaActual = new Date().toISOString();

    return {
        nombreSlider: data.nombreSlider,
        urlSlider: data.urlSlider || 'no-imagen.png',
        descripcionSlider: data.descripcionSlider || '',
        estadoSlider: data.estadoSlider ?? true,

        codigoUsuarioCreacion: data.codigoUsuario || data.codigoUsuarioCreacion || 'SISTEMA',
        fechaCreacion: data.fechaCreacion || fechaActual,
        codigoUsuarioModificacion: data.codigoUsuario || data.codigoUsuarioModificacion || 'SISTEMA',
        fechaModificacion: fechaActual
    };
};

module.exports = {
    SliderInicioModel,
    SliderInicioDTO
};
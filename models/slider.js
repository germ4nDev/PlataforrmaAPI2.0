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
            }
        }, {
        tableName: 'PTLSliderInicio',
        timestamps: false
    });
};
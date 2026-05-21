/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const Joi = require('joi');
const { DataTypes } = require('sequelize');

const ActividadRoleSchema = Joi.object({
    codigoActividad: Joi.string().max(50).required()
        .messages({ 'any.required': 'El código de actividad es obligatorio.' }),

    codigoRole: Joi.string().max(50).required()
        .messages({ 'any.required': 'El código de rol es obligatorio.' }),

    permiso: Joi.boolean().required()
        .messages({ 'any.required': 'El estado del permiso debe ser definido.' }),

    // Estos campos suelen venir del sistema, no del usuario
    codigoUsuario: Joi.string().optional().default('SISTEMA'),
});

const ActividadRoleDTO = (rawData) => {
    const { error, value } = ActividadRoleSchema.validate(rawData, { abortEarly: false });

    if (error) {
        throw {
            type: 'ValidationError',
            details: error.details.map(d => ({ campo: d.context.key, mensaje: d.message }))
        };
    }

    return {
        codigoActividad: value.codigoActividad.trim(),
        codigoRole: value.codigoRole.trim(),
        permiso: value.permiso,
        codigoUsuarioCreacion: value.codigoUsuario,
        fechaCreacion: new Date().toISOString(),
        codigoUsuarioModificacion: value.codigoUsuario,
        fechaModificacion: new Date().toISOString()
    };
};

const ActividadRoleModel = (sequelize) => {
    return sequelize.define('PTLActividadesRoles', {
        actividadRoleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true
        },
        codigoActividad: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false
        },
        codigoRole: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false
        },
        permiso: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        codigoUsuarioCreacion: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        fechaCreacion: {
            type: DataTypes.STRING(50), // Recomendable usar DataTypes.DATE en el futuro
            allowNull: false
        },
        codigoUsuarioModificacion: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        fechaModificacion: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'PTLActividadesRoles',
        timestamps: false
    });
};

module.exports = {
    ActividadRoleModel,
    ActividadRoleDTO,
    ActividadRoleSchema
};
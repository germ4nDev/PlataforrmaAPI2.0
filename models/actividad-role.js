// /*
//     Author: German Valencia
// */
// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//     return sequelize.define('PTLActividadesRoles', {
//         actividadRoleId: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true
//         },
//         codigoActividad: {
//             type: DataTypes.STRING,
//             primaryKey: true,
//             allowNull: false
//         },
//         codigoRole: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         permiso: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false
//         },
//         codigoUsuarioCreacion: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         fechaCreacion: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         codigoUsuarioModificacion: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         fechaModificacion: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     }, {
//         tableName: 'PTLActividadesRoles',
//         timestamps: false
//     });
// };

/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const Joi = require('joi');
const { DataTypes } = require('sequelize');

/**
 * 1. ESQUEMA DE VALIDACIÓN (Joi)
 * Protege la integridad de los datos antes de que lleguen a SQL.
 */
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

/**
 * 2. TRANSFORMACIÓN DTO
 * Limpia y normaliza los datos para la API y el Servicio.
 */
const ActividadRoleDTO = (rawData) => {
    const { error, value } = ActividadRoleSchema.validate(rawData, { abortEarly: false });

    if (error) {
        throw {
            type: 'ValidationError',
            details: error.details.map(d => ({ campo: d.context.key, mensaje: d.message }))
        };
    }

    // Retornamos el objeto mapeado exactamente como lo espera la base de datos
    return {
        codigoActividad: value.codigoActividad.trim(),
        codigoRole: value.codigoRole.trim(),
        permiso: value.permiso,
        // Auditoría automática
        codigoUsuarioCreacion: value.codigoUsuario,
        fechaCreacion: new Date().toISOString(),
        codigoUsuarioModificacion: value.codigoUsuario,
        fechaModificacion: new Date().toISOString()
    };
};

/**
 * 3. MODELO DE SEQUELIZE
 * Definición técnica de la tabla SQL.
 */
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
            primaryKey: true, // Si es una tabla intermedia, usualmente ambos son PK
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
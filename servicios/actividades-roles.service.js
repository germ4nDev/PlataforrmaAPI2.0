// const sequelize = require("../database/connection");
// const PTLActividadesRoles = require("../models/actividad-role")(sequelize);
// const { io } = require("../index");

// const obtenerActividadesRoles = async () => {
//   return await PTLActividadesRoles.findAll();
// };

// const obtenerPorCodigoActividad = async (codigoActividad) => {
//   return await PTLActividadesRoles.findAll({
//     where: { codigoActividad },
//   });
// };

// const obtenerPorCodigoRole = async (codigoRole) => {
//   return await PTLActividadesRoles.findAll({
//     where: { codigoRole },
//   });
// };

// const crearActividadRole = async (data) => {
//   const exActividad = await PTLActividadesRoles.findOne({
//     where: {
//       codigoActividad: data.codigoActividad,
//       codigoRole: data.codigoRole,
//     },
//   });

//   if (exActividad) {
//     throw { statusCode: 400, msg: "Ya existe una actividadRole con ese código" };
//   }

//   const actividadRoleDB = await PTLActividadesRoles.create(data);

//   io.emit("actividades-roles-actualizadas", {
//     action: "create",
//     msg: `Actividad Role creada`,
//   });

//   return actividadRoleDB;
// };

// const actualizarActividadRole = async (codigoActividad, codigoRole, data, usuarioId) => {
//   const actividadDB = await PTLActividadesRoles.findOne({
//     where: { codigoActividad, codigoRole },
//   });

//   if (!actividadDB) {
//     throw { statusCode: 404, msg: "No existe una ActividadRole con esa combinacion de codigos" };
//   }

//   data.codigoUsuarioModificacion = usuarioId || 0;
//   data.fechaModificacion = new Date().toISOString();

//   await PTLActividadesRoles.update(data, {
//     where: { codigoActividad, codigoRole },
//   });

//   const actividadActualizada = await PTLActividadesRoles.findOne({
//     where: { codigoActividad, codigoRole },
//   });

//   io.emit("actividades-roles-actualizadas", {
//     action: "update",
//     msg: `ActividadRole actualizada`,
//   });

//   return actividadActualizada;
// };

// const eliminarActividadRole = async (codigoActividad, codigoRole) => {
//   const actividadDB = await PTLActividadesRoles.findOne({
//     where: { codigoActividad, codigoRole },
//   });

//   if (!actividadDB) {
//     throw { statusCode: 404, msg: "No existe una actividad con esa combinacion de codigos" };
//   }

//   const actividadEliminada = await PTLActividadesRoles.destroy({
//     where: { codigoActividad, codigoRole },
//   });

//   io.emit("actividades-roles-actualizadas", {
//     action: "delete",
//     msg: `ActividadRole eliminada`,
//   });

//   return actividadEliminada;
// };

// module.exports = {
//   obtenerActividadesRoles,
//   obtenerPorCodigoActividad,
//   obtenerPorCodigoRole,
//   crearActividadRole,
//   actualizarActividadRole,
//   eliminarActividadRole,
// };

/**
 * MANEJO DE DTO
 */

// const { ActividadRoleDTO } = require("../models/actividad-role.model");

// class ActividadRoleService {
//   constructor(repository, io) {
//     this.repository = repository;
//     this.io = io;
//     this.eventTag = "actividades-roles-actualizadas";
//   }

//   /**
//    * Retorna todas las actividades-roles con formato estándar
//    */
//   async obtenerTodos() {
//     try {
//       const resultados = await this.repository.findAll();
//       return {
//         OK: true,
//         data: resultados,
//         message: "Lista de actividades por rol obtenida.",
//         errors: []
//       };
//     } catch (error) {
//       return this._handleError(error);
//     }
//   }

//   /**
//    * Crea una nueva relación validando existencia previa y usando DTO
//    */
//   async crear(rawData) {
//     try {
//       // 1. Validar y Transformar datos con el DTO
//       const datosValidados = ActividadRoleDTO(rawData);

//       // 2. Lógica de negocio: Verificar duplicidad
//       const existe = await this.repository.findOne({
//         where: {
//           codigoActividad: datosValidados.codigoActividad,
//           codigoRole: datosValidados.codigoRole,
//         },
//       });

//       if (existe) {
//         return {
//           OK: false,
//           data: null,
//           message: "Ya existe esta combinación de Actividad y Rol.",
//           errors: [{ campo: "combinacion", detalle: "Duplicado" }]
//         };
//       }

//       // 3. Persistencia
//       const nuevoRegistro = await this.repository.create(datosValidados);

//       // 4. Notificación (Socket.io)
//       this._emitChange("create", "Actividad Role creada");

//       return {
//         OK: true,
//         data: nuevoRegistro,
//         message: "Relación creada exitosamente.",
//         errors: []
//       };
//     } catch (error) {
//       return this._handleError(error);
//     }
//   }

//   async actualizar(codigoActividad, codigoRole, rawData, usuarioId) {
//     try {
//       // 1. Verificar existencia
//       const registroDB = await this.repository.findOne({
//         where: { codigoActividad, codigoRole },
//       });

//       if (!registroDB) {
//         return {
//           OK: false,
//           data: null,
//           message: "No se encontró la relación para actualizar.",
//           errors: []
//         };
//       }

//       // 2. Preparar datos de auditoría (Regla transversal)
//       const datosActualizacion = {
//         ...rawData,
//         codigoUsuarioModificacion: usuarioId || 0,
//         fechaModificacion: new Date()
//       };

//       // 3. Ejecutar actualización
//       await this.repository.update(datosActualizacion, {
//         where: { codigoActividad, codigoRole },
//       });

//       const actualizado = await this.repository.findOne({
//         where: { codigoActividad, codigoRole },
//       });

//       this._emitChange("update", "Actividad Role actualizada");

//       return {
//         OK: true,
//         data: actualizado,
//         message: "Registro actualizado correctamente.",
//         errors: []
//       };
//     } catch (error) {
//       return this._handleError(error);
//     }
//   }

//   _emitChange(action, msg) {
//     if (this.io) {
//       this.io.emit(this.eventTag, { action, msg });
//     }
//   }

//   _handleError(error) {
//     // console.error([QPLUS API ERROR]: ${error.message});
//     return {
//       OK: false,
//       data: null,
//       message: "Error interno en el servicio de Actividades-Roles",
//       errors: [{ detalle: error.message }]
//     };
//   }
// }

// module.exports = ActividadRoleService;



/**
 * MANEJO DE TRANSACCIONES EN SQL
 */
const { ActividadRoleDTO } = require("../models/actividad-role.model");
const sequelize = require("../database/connection");

class ActividadRoleService {
  constructor(repository, io) {
    this.repository = repository;
    this.io = io;
    this.eventTag = "actividades-roles-actualizadas";
  }

  async obtenerTodos() {
    try {
      const resultados = await this.repository.findAll();
      return {
        OK: true,
        data: resultados,
        message: "Lista de actividades por rol obtenida.",
        errors: []
      };
    } catch (error) {
      return this._handleError(error);
    }
  }

  async crear(rawData) {
    // 1. Iniciamos la transacción
    const t = await sequelize.transaction();

    try {
      const datosValidados = ActividadRoleDTO(rawData);

      // 2. Verificamos duplicidad pasando la transacción { transaction: t }
      const existe = await this.repository.findOne({
        where: {
          codigoActividad: datosValidados.codigoActividad,
          codigoRole: datosValidados.codigoRole,
        },
        transaction: t
      });

      if (existe) {
        await t.rollback(); // Cerramos la transacción antes de retornar
        return {
          OK: false,
          data: null,
          message: "Ya existe esta combinación de Actividad y Rol.",
          errors: [{ campo: "combinacion", detalle: "Duplicado" }]
        };
      }

      // 3. Persistencia con transacción
      const nuevoRegistro = await this.repository.create(datosValidados, { transaction: t });

      // 4. Si llegamos aquí, confirmamos los cambios en SQL
      await t.commit();

      this._emitChange("create", "Actividad Role creada");

      return {
        OK: true,
        data: nuevoRegistro,
        message: "Relación creada exitosamente.",
        errors: []
      };
    } catch (error) {
      // 5. Ante cualquier fallo, deshacemos todo lo que pasó en el bloque try
      if (t) await t.rollback();
      return this._handleError(error);
    }
  }

  async actualizar(codigoActividad, codigoRole, rawData, usuarioId) {
    const t = await sequelize.transaction();

    try {
      const registroDB = await this.repository.findOne({
        where: { codigoActividad, codigoRole },
        transaction: t
      });

      if (!registroDB) {
        await t.rollback();
        return {
          OK: false,
          data: null,
          message: "No se encontró la relación para actualizar.",
          errors: []
        };
      }

      const datosActualizacion = {
        ...rawData,
        codigoUsuarioModificacion: usuarioId || 0,
        fechaModificacion: new Date()
      };

      // Ejecutar actualización con transacción
      await this.repository.update(datosActualizacion, {
        where: { codigoActividad, codigoRole },
        transaction: t
      });

      const actualizado = await this.repository.findOne({
        where: { codigoActividad, codigoRole },
        transaction: t
      });

      // Confirmamos cambios
      await t.commit();

      this._emitChange("update", "Actividad Role actualizada");

      return {
        OK: true,
        data: actualizado,
        message: "Registro actualizado correctamente.",
        errors: []
      };
    } catch (error) {
      if (t) await t.rollback();
      return this._handleError(error);
    }
  }

  _emitChange(action, msg) {
    if (this.io) {
      this.io.emit(this.eventTag, { action, msg });
    }
  }

  _handleError(error) {
    return {
      OK: false,
      data: null,
      message: "Error interno en el servicio de Actividades-Roles",
      errors: [{ detalle: error.message }]
    };
  }
}

module.exports = ActividadRoleService;

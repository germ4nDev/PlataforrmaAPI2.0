// /*
//     Author: German Valencia
// */
// const express = require("express");
// const sequelize = require("../database/connection");
// const PTLUsuariosRole = require("../models/usuario-role")(sequelize);
// const { io } = require("../index");

// // Obtener todos los roles
// const getUsuariosRoles = async (req, res) => {
//   try {
//     const usuariosRoles = await PTLUsuariosRole.findAll();
//     console.log("usuarios roles", usuariosRoles);
//     return res.status(201).json({
//       ok: true,
//       usuariosRoles: usuariosRoles,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener UsuariosRoles" });
//   }
// };

// const getUsuariosRolesById = async (req, res) => {
//   try {
//     const usuarioRoleId = req.params.id;
//     const usuarioRole = await PTLUsuariosRole.findOne({
//       where: {
//         usuarioRoleId: usuarioRoleId,
//       },
//     });
//     if (!usuarioRole) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un usuarioRole por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       usuarioRole: usuarioRole,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener usuarioRole" });
//   }
// };

// const getUsuariosPorCodigoRol = async (req, res) => {
//   try {
//     const codigoRole = req.params.codigoRole; 
//     const usuarioRole = await PTLUsuariosRole.findAll({
//       where: {
//          codigoRole: codigoRole
//       }
//     });

//     return res.status(200).json({
//       ok: true,
//       usuarioRole
//     });
//   } catch (err) {
//     console.error("Error en el Backend:", err);
//     res.status(500).json({ error: "Error al obtener codigoRol" });
//   }
// };

// const createUsuarioRole = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   try {
//     const nuevo = await PTLUsuariosRole.create(newRegistro);
//     io.emit("usuarios-roles-actualizados", {
//       action: "create",
//       msg: `Usuario Role creado`,
//     });
//     return res.status(201).json({
//       ok: true,
//       usuarioRole: nuevo,
//     });
//   // } catch (err) {
//   //   res.status(500).json({ error: "Error al crear el usuario role" });
//   // }
//   } catch (err) {
//     console.error("ERROR REAL EN BD:", err); // <--- ESTO te dirá exactamente qué campo falta
//     res.status(500).json({ 
//         error: "Error al crear el usuario role",
//         detalles: err.message // Esto te ayudará a debuguear más rápido
//     });
//   }
// };

// // const updateUsuarioRole = async (req, res = response) => {
// //   const { usuarioRoleId, ...data } = req.body;
// //   try {
// //     const usuarioRoleDB = await PTLUsuariosRole.findOne({
// //       where: { usuarioRoleId },
// //     });
// //     if (!usuarioRoleDB) {
// //       return res.status(404).json({
// //         ok: false,
// //         msg: "No existe un usuarioRole con ese ID",
// //       });
// //     }
// //     await PTLUsuariosRole.update(data, {
// //       where: { usuarioRoleId },
// //     });
// //     const usuarioRoleActualizado = await PTLUsuariosRole.findOne({
// //       where: { usuarioRoleId },
// //     });
// //     io.emit("usuarios-roles-actualizados", {
// //       action: "update",
// //       msg: `Usuario Role actualizado`,
// //     });
// //     return res.status(200).json({
// //       ok: true,
// //       usuarioRole: usuarioRoleActualizado,
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({
// //       ok: false,
// //       error: "Error al actualizar el usuarioRole",
// //     });
// //   }
// // };

// const updateUsuarioRole = async (req, res) => {
//     const t = await sequelize.transaction(); // Iniciamos transacción por seguridad
//     try {
//         const { id } = req.params; // codigoRole
//         const { usuariosSeleccionados, ...datosRol } = req.body;

//         // 1. Actualizar los datos básicos del Rol (Nombre, descripción, etc.)
//         await PTLRolesAP.update(datosRol, { 
//             where: { codigoRole: id },
//             transaction: t 
//         });

//         // 2. ELIMINAR las asociaciones actuales para este rol
//         await PTLUsuariosRole.destroy({
//             where: { codigoRole: id },
//             transaction: t
//         });

//         // 3. INSERTAR las nuevas asociaciones seleccionadas
//         if (usuariosSeleccionados && usuariosSeleccionados.length > 0) {
//             const nuevasAsociaciones = usuariosSeleccionados.map(codUser => ({
//                 codigoRole: id,
//                 codigoUsuarioSC: codUser,
//                 codigoEmpresaSC: datosRol.codigoEmpresaSC || '', 
//                 codigoAplicacion: datosRol.codigoAplicacion,
//                 codigoSuite: datosRol.codigoSuite,
//                 tipoRol: datosRol.tipoRol,
//                 estadoUsuarioRole: true,
//                 // Auditoría
//                 codigoUsuarioCreacion: datosRol.usuarioModificacion, // o el que corresponda
//                 fechaCreacion: new Date().toISOString(),
//                 codigoUsuarioModificacion: datosRol.usuarioModificacion,
//                 fechaModificacion: new Date().toISOString()
//             }));

//             await PTLUsuariosRole.bulkCreate(nuevasAsociaciones, { transaction: t });
//         }

//         await t.commit();
//         res.json({ ok: true, msg: 'Rol y usuarios actualizados correctamente' });

//     } catch (error) {
//         await t.rollback();
//         console.error(error);
//         res.status(500).json({ ok: false, msg: 'Error al actualizar' });
//     }
// };

// const updateUsuarioRoles = async (req, res) => {
//     const t = await sequelize.transaction(); 
//     try {
//         const { id } = req.params; 
//         const { rolesSeleccionados, ...datosUsuario } = req.body;

//         await PTLUsuarios.update(datosUsuario, { 
//             where: { codigoUsuario: id },
//             transaction: t 
//         });

//         await PTLUsuariosRole.destroy({
//             where: { codigoUsuarioSC: id },
//             transaction: t
//         });

//         if (rolesSeleccionados && rolesSeleccionados.length > 0) {
//             const nuevasAsociaciones = rolesSeleccionados.map(rol => ({
//                 codigoUsuarioSC: id,
//                 codigoRole: rol.codigoRole,
//                 codigoEmpresaSC: '', 
//                 codigoAplicacion: rol.codigoAplicacion,
//                 codigoSuite: rol.codigoSuite,
//                 tipoRol: rol.tipoRol || 'Suscritor',
//                 estadoUsuarioRole: true,
//                 // Auditoría
//                 codigoUsuarioCreacion: datosUsuario.codigoUsuarioModificacion,
//                 fechaCreacion: new Date().toISOString(),
//                 codigoUsuarioModificacion: datosUsuario.codigoUsuarioModificacion,
//                 fechaModificacion: new Date().toISOString()
//             }));

//             await PTLUsuariosRole.bulkCreate(nuevasAsociaciones, { transaction: t });
//         }

//         await t.commit();
//         res.json({ ok: true, msg: 'Usuario y roles actualizados correctamente' });

//     } catch (error) {
//         await t.rollback();
//         console.error("Error en updateUsuarioRoles:", error);
//         res.status(500).json({ ok: false, msg: 'Error al actualizar el usuario y sus roles' });
//     }
// };

// const deleteUsuarioRole = async (req, res = response) => {
//   try {
//     const usuarioRoleId = req.params.id;
//     const usuarioRoleDB = await PTLUsuariosRole.findOne({
//       where: { usuarioRoleId },
//     });
//     if (!usuarioRoleDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un usuario por ese id",
//       });
//     }
//     console.log("eliminar el registro", usuarioRoleDB);
//     usuarioRoleDBEliminado = await PTLUsuariosRole.destroy({
//       where: { usuarioRoleId },
//     });
//     io.emit("usuarios-roles-actualizados", {
//       action: "delete",
//       msg: `Usuario Role eliminado`,
//     });
//     return res.status(201).json({
//       ok: true,
//       usuarioRole: usuarioRoleDBEliminado,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al eliminar usuario role" });
//   }
// };

// const deleteTodosUsuarioRole = async (req, res = response) => {
//   try {
//     const { id } = req.params; 

//     console.log("Limpiando relaciones para el Rol:", id);

//     const eliminados = await PTLUsuariosRole.destroy({
//       where: { codigoRole: id }
//     });

//     return res.status(200).json({
//       ok: true,
//       msg: `Se eliminaron ${eliminados} asociaciones anteriores.`,
//     });

//   } catch (err) {
//     console.error("Error al limpiar usuario role", err);
//     return res.status(500).json({ ok: false, error: "Error al eliminar usuario role" });
//   }
// };

// const getRolesPorCodigoUsuario = async (req, res) => {
//   try {
//     const codigoUsuario = req.params.codigoUsuarioSC;
//     const usuarioRole = await PTLUsuariosRole.findAll({
//       where: { codigoUsuarioSC: codigoUsuario } // Filtramos por la columna del usuario
//     });
//     res.json({ ok: true, usuarioRole });
//   } catch (err) {
//     res.status(500).json({ ok: false, msg: 'Error' });
//   }
// };

// const deleteRolesPorUsuario = async (req, res = response) => {
//   try {
//     const { id } = req.params;
//     const eliminados = await PTLUsuariosRole.destroy({
//       where: { codigoUsuarioSC: id }
//     });
//     return res.status(200).json({
//       ok: true,
//       msg: `Se eliminaron ${eliminados} asociaciones anteriores.`,
//     });

//   } catch (err) {
//     console.error("Error crítico en deleteRolesPorUsuario:", err);
//     return res.status(500).json({ ok: false, error: "Error interno del servidor" });
//   }
// };


// module.exports = {
//   getUsuariosRoles,
//   getUsuariosRolesById,
//   getUsuariosPorCodigoRol,
//   createUsuarioRole,
//   updateUsuarioRole,
//   updateUsuarioRoles,
//   deleteUsuarioRole,
//   deleteTodosUsuarioRole,
//   getRolesPorCodigoUsuario,
//   deleteRolesPorUsuario
// };

/*
    Author: German Valencia
*/
const { response } = require("express");
const usuariosRolesService = require("../services/usuarios-roles.service");

const getUsuariosRoles = async (req, res = response) => {
  try {
    const usuariosRoles = await usuariosRolesService.obtenerUsuariosRoles();

    return res.status(200).json({ // Cambiado a 200
      ok: true,
      usuariosRoles: usuariosRoles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener UsuariosRoles" });
  }
};

const getUsuariosRolesById = async (req, res = response) => {
  try {
    const usuarioRole = await usuariosRolesService.obtenerUsuarioRolePorId(req.params.id);

    return res.status(200).json({ // Cambiado a 200
      ok: true,
      usuarioRole: usuarioRole,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener usuarioRole" });
  }
};

const getUsuariosPorCodigoRol = async (req, res = response) => {
  try {
    const usuarioRole = await usuariosRolesService.obtenerUsuariosPorCodigoRol(req.params.codigoRole);

    return res.status(200).json({
      ok: true,
      usuarioRole
    });
  } catch (err) {
    console.error("Error en el Backend:", err);
    res.status(500).json({ error: "Error al obtener codigoRol" });
  }
};

const getRolesPorCodigoUsuario = async (req, res = response) => {
  try {
    const usuarioRole = await usuariosRolesService.obtenerRolesPorCodigoUsuario(req.params.codigoUsuarioSC);

    res.status(200).json({
      ok: true,
      usuarioRole
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Error al obtener roles por código de usuario' });
  }
};

const createUsuarioRole = async (req, res = response) => {
  try {
    const nuevo = await usuariosRolesService.crearUsuarioRole(req.body);

    return res.status(201).json({
      ok: true,
      usuarioRole: nuevo,
    });
  } catch (err) {
    console.error("ERROR REAL EN BD:", err);
    res.status(500).json({
      error: "Error al crear el usuario role",
      detalles: err.message
    });
  }
};

const updateUsuarioRole = async (req, res = response) => {
  try {
    const { usuariosSeleccionados, ...datosRol } = req.body;

    const resultado = await usuariosRolesService.actualizarUsuarioRole(req.params.id, datosRol, usuariosSeleccionados);

    res.status(200).json({
      ok: true,
      msg: resultado.msg
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg, detalles: err.error });
    }
    res.status(500).json({ ok: false, msg: 'Error al actualizar' });
  }
};

const updateUsuarioRoles = async (req, res = response) => {
  try {
    const { rolesSeleccionados, ...datosUsuario } = req.body;

    const resultado = await usuariosRolesService.actualizarUsuarioRoles(req.params.id, datosUsuario, rolesSeleccionados);

    res.status(200).json({
      ok: true,
      msg: resultado.msg
    });
  } catch (err) {
    console.error("Error en updateUsuarioRoles:", err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg, detalles: err.error });
    }
    res.status(500).json({ ok: false, msg: 'Error al actualizar el usuario y sus roles' });
  }
};

const deleteUsuarioRole = async (req, res = response) => {
  try {
    const usuarioRoleDBEliminado = await usuariosRolesService.eliminarUsuarioRole(req.params.id);

    return res.status(200).json({ // Cambiado a 200
      ok: true,
      usuarioRole: usuarioRoleDBEliminado,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al eliminar usuario role" });
  }
};

const deleteTodosUsuarioRole = async (req, res = response) => {
  try {
    const eliminados = await usuariosRolesService.eliminarTodosUsuariosRolePorRol(req.params.id);

    return res.status(200).json({
      ok: true,
      msg: `Se eliminaron ${eliminados} asociaciones anteriores.`,
    });
  } catch (err) {
    console.error("Error al limpiar usuario role", err);
    return res.status(500).json({ ok: false, error: "Error al eliminar usuario role" });
  }
};

const deleteRolesPorUsuario = async (req, res = response) => {
  try {
    const eliminados = await usuariosRolesService.eliminarRolesPorUsuario(req.params.id);

    return res.status(200).json({
      ok: true,
      msg: `Se eliminaron ${eliminados} asociaciones anteriores.`,
    });
  } catch (err) {
    console.error("Error crítico en deleteRolesPorUsuario:", err);
    return res.status(500).json({ ok: false, error: "Error interno del servidor" });
  }
};

module.exports = {
  getUsuariosRoles,
  getUsuariosRolesById,
  getUsuariosPorCodigoRol,
  getRolesPorCodigoUsuario,
  createUsuarioRole,
  updateUsuarioRole,
  updateUsuarioRoles,
  deleteUsuarioRole,
  deleteTodosUsuarioRole,
  deleteRolesPorUsuario
};
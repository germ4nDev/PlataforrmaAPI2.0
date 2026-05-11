// /*
//     Author: German Valencia
// */
// const express = require("express");
// const sequelize = require("../database/connection");
// const PTLActividadesRoles = require("../models/actividad-role")(sequelize);
// const { io } = require("../index");

// const getActividadesRoles = async (req, res) => {
//   try {
//     const actividadesRoles = await PTLActividadesRoles.findAll();
//     return res.status(201).json({
//       ok: true,
//       actividadesRoles: actividadesRoles,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener ActividadesRolesRoles" });
//   }
// };

// const getActividadByCodeActividad = async (req, res) => {
//   try {
//     const codigoActividad = req.params.id;
//     const actividadesRoles = await PTLActividadesRoles.findAll({
//       where: {
//         codigoActividad: codigoActividad,
//       },
//     });
//     return res.status(201).json({
//       ok: true,
//       actividadesRoles: actividadesRoles,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener actividades" });
//   }
// };

// const getActividadByCodeRole = async (req, res) => {
//   try {
//     const codigoRole = req.params.id;
//     const actividadesRoles = await PTLActividadesRoles.findAll({
//       where: {
//         codigoRole: codigoRole,
//       },
//     });
//     return res.status(201).json({
//       ok: true,
//       actividadesRoles: actividadesRoles,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener actividades" });
//   }
// };

// const createActividadRole = async (req, res = response) => {
//   const { ...data } = req.body;
//   console.log("crear actividadRole", data);
//   try {
//     const exActividad = await PTLActividadesRoles.findOne({
//       where: {
//         codigoActividad: data.codigoActividad,
//         codigoRole: data.codigoRole,
//       },
//     });
//     if (exActividad) {
//       return res.status(400).json({
//         ok: false,
//         msg: "Ya existe una actividadRole con ese código",
//       });
//     }
//     console.log("nueva actividad", data);
//     const actividadRoleDB = await PTLActividadesRoles.create(data);
//     io.emit("actividades-roles-actualizadas", {
//       action: "create",
//       msg: `Actividad Role creada`,
//     });
//     return res.status(201).json({
//       ok: true,
//       actividadRole: actividadRoleDB,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: "Error al crear la actividadRole",
//     });
//   }
// };

// const updateActividadRole = async (req, res = response) => {
//   const { codigoActividad, codigoRole, ...data } = req.body;
//   try {
//     console.log("body", req.body);
//     const actividadDB = await PTLActividadesRoles.findOne({
//       where: { codigoActividad, codigoRole },
//     });
//     if (!actividadDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe una ActividadRole con esa combinacion de codigos",
//       });
//     }
//     data.codigoUsuarioModificacion = req.usuario?.id || 0;
//     data.fechaModificacion = new Date().toISOString();
//     await PTLActividadesRoles.update(data, {
//       where: { codigoActividad, codigoRole },
//     });
//     const actividadActualizada = await PTLActividadesRoles.findOne({
//       where: { codigoActividad, codigoRole },
//     });
//     io.emit("actividades-roles-actualizadas", {
//       action: "update",
//       msg: `ActividadRole actualizada`,
//     });
//     return res.status(200).json({
//       ok: true,
//       actividadRole: actividadActualizada,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: "Error al actualizar la aplicación",
//     });
//   }
// };

// const deleteActividadRole = async (req, res = response) => {
//   try {
//     const codigoActividad = req.params.ac;
//     const codigoRole = req.params.ro;
//     const actividadDB = await PTLActividadesRoles.findOne({
//       where: { codigoActividad, codigoRole },
//     });
//     if (!actividadDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe una actividad con esa combinacion de codigos",
//       });
//     }
//     const actividadEliminada = await PTLActividadesRoles.destroy({
//       where: { codigoActividad, codigoRole },
//     });
//     io.emit("actividadesRoles-actualizadas", {
//       action: "delete",
//       msg: `ActividadRole eliminada`,
//     });
//     return res.status(200).json({
//       ok: true,
//       actividadRole: actividadEliminada,
//       msg: "ActividadRole eliminada correctamente",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: "Error al eliminar la ActividadRole",
//     });
//   }
// };

// module.exports = {
//   getActividadesRoles,
//   getActividadByCodeActividad,
//   getActividadByCodeRole,
//   createActividadRole,
//   updateActividadRole,
//   deleteActividadRole,
// };
/*
    Author: German Valencia
*/
// const { response } = require("express");
// const actividadesRolesService = require("../services/actividades-roles.service"); // Ajusta la ruta según tu estructura

// const getActividadesRoles = async (req, res = response) => {
//   try {
//     const actividadesRoles = await actividadesRolesService.obtenerActividadesRoles();
//     return res.status(200).json({
//       ok: true,
//       actividadesRoles,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ ok: false, error: "Error al obtener ActividadesRolesRoles" });
//   }
// };

// const getActividadByCodeActividad = async (req, res = response) => {
//   try {
//     const actividadesRoles = await actividadesRolesService.obtenerPorCodigoActividad(req.params.id);
//     return res.status(200).json({
//       ok: true,
//       actividadesRoles,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ ok: false, error: "Error al obtener actividades" });
//   }
// };

// const getActividadByCodeRole = async (req, res = response) => {
//   try {
//     const actividadesRoles = await actividadesRolesService.obtenerPorCodigoRole(req.params.id);
//     return res.status(200).json({
//       ok: true,
//       actividadesRoles,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ ok: false, error: "Error al obtener actividades" });
//   }
// };

// const createActividadRole = async (req, res = response) => {
//   try {
//     const actividadRoleDB = await actividadesRolesService.crearActividadRole(req.body);
//     return res.status(201).json({
//       ok: true,
//       actividadRole: actividadRoleDB,
//     });
//   } catch (err) {
//     console.error(err);
//     if (err.statusCode) {
//       return res.status(err.statusCode).json({ ok: false, msg: err.msg });
//     }
//     return res.status(500).json({ ok: false, error: "Error al crear la actividadRole" });
//   }
// };

// const updateActividadRole = async (req, res = response) => {
//   try {
//     const { codigoActividad, codigoRole, ...data } = req.body;
//     const usuarioId = req.usuario?.id;

//     const actividadActualizada = await actividadesRolesService.actualizarActividadRole(
//       codigoActividad,
//       codigoRole,
//       data,
//       usuarioId
//     );

//     return res.status(200).json({
//       ok: true,
//       actividadRole: actividadActualizada,
//     });
//   } catch (err) {
//     console.error(err);
//     if (err.statusCode) {
//       return res.status(err.statusCode).json({ ok: false, msg: err.msg });
//     }
//     return res.status(500).json({ ok: false, error: "Error al actualizar la ActividadRole" });
//   }
// };

// const deleteActividadRole = async (req, res = response) => {
//   try {
//     // Tomamos los parámetros tal cual los tenías en tus rutas (ac y ro)
//     const codigoActividad = req.params.ac;
//     const codigoRole = req.params.ro;

//     const actividadEliminada = await actividadesRolesService.eliminarActividadRole(codigoActividad, codigoRole);

//     return res.status(200).json({
//       ok: true,
//       actividadRole: actividadEliminada,
//       msg: "ActividadRole eliminada correctamente",
//     });
//   } catch (err) {
//     console.error(err);
//     if (err.statusCode) {
//       return res.status(err.statusCode).json({ ok: false, msg: err.msg });
//     }
//     return res.status(500).json({ ok: false, error: "Error al eliminar la ActividadRole" });
//   }
// };

// module.exports = {
//   getActividadesRoles,
//   getActividadByCodeActividad,
//   getActividadByCodeRole,
//   createActividadRole,
//   updateActividadRole,
//   deleteActividadRole,
// };

const ActividadRoleService = require("../services/actividad-role.service");
const sequelize = require("../database/connection");
const PTLActividadesRoles = require("../models/actividad-role")(sequelize);
const { io } = require("../index");

// Instanciamos el servicio inyectando el modelo (como repositorio) y socket.io
const service = new ActividadRoleService(PTLActividadesRoles, io);

/**
 * Los controladores en QPLUS ahora son limpios. 
 * Solo manejan el protocolo HTTP (res.status) y delegan la lógica al servicio.
 */

const obtenerTodos = async (req, res) => {
  const respuesta = await service.obtenerTodos();
  return res.status(respuesta.OK ? 200 : 400).json(respuesta);
};

const crear = async (req, res) => {
  // Pasamos el cuerpo de la petición directamente al servicio
  const respuesta = await service.crear(req.body);

  // El status code depende de si la operación fue válida o no
  const statusCode = respuesta.OK ? 201 : 400;
  return res.status(statusCode).json(respuesta);
};

const actualizar = async (req, res) => {
  // Obtenemos los parámetros de la URL y los datos del cuerpo
  const { codigoActividad, codigoRole } = req.params;
  const usuarioId = req.usuario?.id || 0; // Asumiendo que tienes un middleware de auth

  const respuesta = await service.actualizar(
    codigoActividad,
    codigoRole,
    req.body,
    usuarioId
  );

  const statusCode = respuesta.OK ? 200 : (respuesta.message.includes('No se encontró') ? 404 : 400);
  return res.status(statusCode).json(respuesta);
};

const eliminar = async (req, res) => {
  const { codigoActividad, codigoRole } = req.params;

  // Podrías añadir el método eliminar al servicio siguiendo la misma lógica
  const respuesta = await service.eliminar(codigoActividad, codigoRole);

  return res.status(respuesta.OK ? 200 : 404).json(respuesta);
};

module.exports = {
  obtenerTodos,
  crear,
  actualizar,
  eliminar
};
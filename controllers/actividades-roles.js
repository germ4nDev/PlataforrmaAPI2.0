/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ActividadesRolesService = require("../services/actividades-roles.service");
const service = new ActividadesRolesService();

const getActividadesRoles = async (req, res = response) => {
  try {
    const actividadesRoles = await service.getActividadesRoles();
    return res.status(200).json({ ok: true, respuesta: actividadesRoles });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Error al obtener actividades" });
  }
};

const getActividadByCodeActividad = async (req, res = response) => {
  try {
    const { ac } = req.params;
    const data = await service.getActividadByCodeActividad(ac);
    return res.status(200).json({ ok: true, respuesta: data });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error.msg || "Error en la consulta" });
  }
};

const getActividadByCodeRole = async (req, res = response) => {
  try {
    const { ro } = req.params;
    const data = await service.getActividadByCodeRole(ro);
    return res.status(200).json({ ok: true, respuesta: data });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error.msg || "Error en la consulta" });
  }
};

const createActividadRole = async (req, res = response) => {
  try {
    // Extraemos el usuario del JWT para la auditoría del DTO
    const usuarioAccion = req.usuario?.codigoUsuario || 'SISTEMA';
    const dataDTO = { ...req.body, codigoUsuario: usuarioAccion };

    const nuevaActividad = await service.createActividadRole(dataDTO);
    return res.status(201).json({ ok: true, respuesta: nuevaActividad });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const updateActividadRole = async (req, res = response) => {
  try {
    const { ac, ro } = req.params; // Sincronizado con la ruta
    const usuarioAccion = req.usuario?.codigoUsuario || 'SISTEMA';

    const actividadActualizada = await service.updateActividadRole(ac, ro, req.body, usuarioAccion);
    return res.status(200).json({ ok: true, respuesta: actividadActualizada });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

const deleteActividadRole = async (req, res = response) => {
  try {
    const { ac, ro } = req.params;
    await service.deleteActividadRole(ac, ro);
    return res.status(200).json({ ok: true, msg: "Registro eliminado correctamente" });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
  }
};

module.exports = {
  getActividadesRoles,
  getActividadByCodeActividad,
  getActividadByCodeRole,
  createActividadRole,
  updateActividadRole,
  deleteActividadRole,
};
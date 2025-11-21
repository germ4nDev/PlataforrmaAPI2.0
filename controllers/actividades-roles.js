/*
    Author: German Valencia
*/
const express = require("express");
const sequelize = require("../database/connection");
const PTLActividadesRoles = require("../models/actividad-role")(sequelize);
const { io } = require("../index");

const getActividadesRoles = async (req, res) => {
  try {
    const actividadesRoles = await PTLActividadesRoles.findAll();
    return res.status(201).json({
      ok: true,
      actividadesRoles: actividadesRoles,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener ActividadesRolesRoles" });
  }
};

const getActividadByCodeActividad = async (req, res) => {
  try {
    const codigoActividad = req.params.id;
    const actividadesRoles = await PTLActividadesRoles.findAll({
      where: {
        codigoActividad: codigoActividad,
      },
    });
    return res.status(201).json({
      ok: true,
      actividadesRoles: actividadesRoles,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener actividades" });
  }
};

const getActividadByCodeRole = async (req, res) => {
  try {
    const codigoRole = req.params.id;
    const actividadesRoles = await PTLActividadesRoles.findAll({
      where: {
        codigoRole: codigoRole,
      },
    });
    return res.status(201).json({
      ok: true,
      actividadesRoles: actividadesRoles,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener actividades" });
  }
};

const createActividadRole = async (req, res = response) => {
  const { ...data } = req.body;
  console.log("crear actividadRole", data);
  try {
    const exActividad = await PTLActividadesRoles.findOne({
      where: {
        codigoActividad: data.codigoActividad,
        codigoRole: data.codigoRole,
      },
    });
    if (exActividad) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una actividadRole con ese código",
      });
    }
    console.log("nueva actividad", data);
    const actividadRoleDB = await PTLActividadesRoles.create(data);
    io.emit("actividades-roles-actualizadas", {
      action: "create",
      msg: `Actividad Role creada`,
    });
    return res.status(201).json({
      ok: true,
      actividadRole: actividadRoleDB,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al crear la actividadRole",
    });
  }
};

const updateActividadRole = async (req, res = response) => {
  const { codigoActividad, codigoRole, ...data } = req.body;
  try {
    console.log("body", req.body);
    const actividadDB = await PTLActividadesRoles.findOne({
      where: { codigoActividad, codigoRole },
    });
    if (!actividadDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una ActividadRole con esa combinacion de codigos",
      });
    }
    data.codigoUsuarioModificacion = req.usuario?.id || 0;
    data.fechaModificacion = new Date().toISOString();
    await PTLActividadesRoles.update(data, {
      where: { codigoActividad, codigoRole },
    });
    const actividadActualizada = await PTLActividadesRoles.findOne({
      where: { codigoActividad, codigoRole },
    });
    io.emit("actividades-roles-actualizadas", {
      action: "update",
      msg: `ActividadRole actualizada`,
    });
    return res.status(200).json({
      ok: true,
      actividadRole: actividadActualizada,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al actualizar la aplicación",
    });
  }
};

const deleteActividadRole = async (req, res = response) => {
  try {
    const codigoActividad = req.params.ac;
    const codigoRole = req.params.ro;
    const actividadDB = await PTLActividadesRoles.findOne({
      where: { codigoActividad, codigoRole },
    });
    if (!actividadDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una actividad con esa combinacion de codigos",
      });
    }
    const actividadEliminada = await PTLActividadesRoles.destroy({
      where: { codigoActividad, codigoRole },
    });
    io.emit("actividadesRoles-actualizadas", {
      action: "delete",
      msg: `ActividadRole eliminada`,
    });
    return res.status(200).json({
      ok: true,
      actividadRole: actividadEliminada,
      msg: "ActividadRole eliminada correctamente",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al eliminar la ActividadRole",
    });
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

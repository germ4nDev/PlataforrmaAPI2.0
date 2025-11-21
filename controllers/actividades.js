/*
    Author: German Valencia
*/
const express = require("express");
const sequelize = require("../database/connection");
const PTLActividades = require("../models/actividad")(sequelize);
const { io } = require("../index");

const getActividades = async (req, res) => {
  try {
    const actividades = await PTLActividades.findAll();
    return res.status(201).json({
      ok: true,
      actividades: actividades,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Actividades" });
  }
};

const getActividadById = async (req, res) => {
  try {
    const codigoActividad = req.params.id;
    const actividad = await PTLActividades.findOne({
      where: {
        codigoActividad: codigoActividad,
      },
    });
    if (!actividad) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un actividad por el id",
      });
    }
    return res.status(201).json({
      ok: true,
      actividad: actividad,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener actividad" });
  }
};

const getActividadByCodeApp = async (req, res) => {
  try {
    const codigoAplicacion = req.params.id;
    const actividades = await PTLActividades.findAll({
      where: {
        codigoAplicacion: codigoAplicacion,
      },
    });
    return res.status(201).json({
      ok: true,
      actividades: actividades,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener actividades" });
  }
};

const getActividadByCodeSuite = async (req, res) => {
  try {
    const codigoSuite = req.params.id;
    const actividades = await PTLActividades.findAll({
      where: {
        codigoSuite: codigoSuite,
      },
    });
    return res.status(201).json({
      ok: true,
      actividades: actividades,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener actividades" });
  }
};

const getActividadByCodeModulo = async (req, res) => {
  try {
    const codigoModulo = req.params.id;
    const actividades = await PTLActividades.findAll({
      where: {
        codigoModulo: codigoModulo,
      },
    });
    return res.status(201).json({
      ok: true,
      actividades: actividades,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener actividades" });
  }
};

const createActividad = async (req, res = response) => {
  const { ...data } = req.body;
  console.log("crear actividad", data);
  try {
    const existente = await PTLActividades.findOne({
      where: { codigoActividad: data.codigoActividad },
    });
    const existeNombre = await PTLActividades.findOne({
      where: { actividad: data.actividad },
    });
    if (existente) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una actividad con ese código",
      });
    }
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una aplicación con ese nombre",
      });
    }
    console.log("nueva actividad", data);
    const actividadDB = await PTLActividades.create(data);
    io.emit("actividades-actualizadas", {
      action: "create",
      msg: `Actividad creada: ${actividadDB.actividad}`,
    });
    return res.status(201).json({
      ok: true,
      actividad: actividadDB,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al crear la aplicación",
    });
  }
};

const updateActividad = async (req, res = response) => {
  const { codigoActividad, ...data } = req.body;
  try {
    console.log("body", req.body);
    const actividadDB = await PTLActividades.findOne({
      where: { codigoActividad },
    });
    if (!actividadDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una actividad con ese codigo",
      });
    }
    data.codigoUsuarioModificacion = req.usuario?.id || 0;
    data.fechaModificacion = new Date().toISOString();
    await PTLActividades.update(data, {
      where: { codigoActividad },
    });
    const actividadActualizada = await PTLActividades.findOne({
      where: { codigoActividad },
    });

    io.emit("actividades-actualizadas", {
      action: "update",
      msg: `Actividad actualizada: ${actividadActualizada.actividad}`,
    });

    return res.status(200).json({
      ok: true,
      actividad: actividadActualizada,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al actualizar la aplicación",
    });
  }
};

const deleteActividad = async (req, res = response) => {
  try {
    const codigoActividad = req.params.id;
    const actividadDB = await PTLActividades.findOne({
      where: { codigoActividad },
    });
    if (!actividadDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una actividad con ese codigo",
      });
    }
    const nombreActividad = actividadDB.actividad;
    const actividadEliminada = await PTLActividades.destroy({
      where: { codigoActividad },
    });
    io.emit("actividades-actualizadas", {
      action: "delete",
      msg: `Actividad eliminada: ${nombreActividad}`,
    });
    return res.status(200).json({
      ok: true,
      actividad: actividadEliminada,
      msg: "Actividad eliminada correctamente",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al eliminar la aplicación",
    });
  }
};

module.exports = {
  getActividades,
  getActividadById,
  getActividadByCodeApp,
  getActividadByCodeSuite,
  getActividadByCodeModulo,
  createActividad,
  updateActividad,
  deleteActividad,
};

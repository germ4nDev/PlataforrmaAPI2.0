/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ActividadesService = require("../services/actividades.service");
const service = new ActividadesService();

const getActividades = async (req, res = response) => {
  try {
    const actividades = await service.getActividades();
    return res.status(200).json({
      ok: true,
      actividades,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error al obtener Actividades" });
  }
};

const getActividadById = async (req, res = response) => {
  try {
    const actividad = await service.g(req.params.id);

    if (!actividad) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una actividad por el id",
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'La actividad se obtuvo correctamente', // Actualicé el mensaje original que decía "se creo"
      actividad,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error al obtener actividad" });
  }
};

const getActividadByCodeApp = async (req, res = response) => {
  try {
    const actividades = await service.getActividadByCodeApp(req.params.id);
    return res.status(200).json({
      ok: true,
      actividades,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error al obtener actividades" });
  }
};

const getActividadByCodeSuite = async (req, res = response) => {
  try {
    const actividades = await service.getActividadByCodeSuite(req.params.id);
    return res.status(200).json({
      ok: true,
      actividades,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error al obtener actividades" });
  }
};

const getActividadByCodeModulo = async (req, res = response) => {
  try {
    const actividades = await service.getActividadByCodeModulo(req.params.id);
    return res.status(200).json({
      ok: true,
      actividades,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error al obtener actividades" });
  }
};

const createActividad = async (req, res = response) => {
  try {
    const actividadDB = await service.createActividad(req.body);
    return res.status(201).json({
      ok: true,
      actividad: actividadDB,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({ ok: false, error: "Error al crear la actividad" });
  }
};

const updateActividad = async (req, res = response) => {
  try {
    const { codigoActividad, ...data } = req.body;
    const usuarioId = req.usuario?.id;

    const actividadActualizada = await service.updateActividad(codigoActividad, data, usuarioId);

    return res.status(200).json({
      ok: true,
      actividad: actividadActualizada,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({ ok: false, error: "Error al actualizar la actividad" });
  }
};

const deleteActividad = async (req, res = response) => {
  try {
    const actividadEliminada = await service.deleteActividad(req.params.id);

    return res.status(200).json({
      ok: true,
      actividad: actividadEliminada,
      msg: "Actividad eliminada correctamente",
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({ ok: false, error: "Error al eliminar la actividad" });
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
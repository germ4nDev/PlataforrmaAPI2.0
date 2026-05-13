const sequelize = require("../database/connection");
const PTLActividades = require("../models/actividad")(sequelize);
const { io } = require("../index");

const obtenerActividades = async () => {
  return await PTLActividades.findAll();
};

const obtenerActividadPorId = async (codigoActividad) => {
  return await PTLActividades.findOne({
    where: { codigoActividad },
  });
};

const obtenerActividadesPorApp = async (codigoAplicacion) => {
  return await PTLActividades.findAll({
    where: { codigoAplicacion },
  });
};

const obtenerActividadesPorSuite = async (codigoSuite) => {
  return await PTLActividades.findAll({
    where: { codigoSuite },
  });
};

const obtenerActividadesPorModulo = async (codigoModulo) => {
  return await PTLActividades.findAll({
    where: { codigoModulo },
  });
};

const crearActividad = async (data) => {
  const existente = await PTLActividades.findOne({
    where: { codigoActividad: data.codigoActividad },
  });
  const existeNombre = await PTLActividades.findOne({
    where: { actividad: data.actividad },
  });

  if (existente) {
    throw { statusCode: 400, msg: "Ya existe una actividad con ese código" };
  }
  if (existeNombre) {
    throw { statusCode: 400, msg: "Ya existe una actividad con ese nombre" };
  }

  const actividadDB = await PTLActividades.create(data);

  io.emit("actividades-actualizadas", {
    action: "create",
    msg: `Actividad creada: ${actividadDB.actividad}`,
  });

  return actividadDB;
};

const actualizarActividad = async (codigoActividad, data, usuarioId) => {
  const actividadDB = await PTLActividades.findOne({
    where: { codigoActividad },
  });

  if (!actividadDB) {
    throw { statusCode: 404, msg: "No existe una actividad con ese código" };
  }

  data.codigoUsuarioModificacion = usuarioId || 0;
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

  return actividadActualizada;
};

const eliminarActividad = async (codigoActividad) => {
  const actividadDB = await PTLActividades.findOne({
    where: { codigoActividad },
  });

  if (!actividadDB) {
    throw { statusCode: 404, msg: "No existe una actividad con ese código" };
  }

  const nombreActividad = actividadDB.actividad;

  const actividadEliminada = await PTLActividades.destroy({
    where: { codigoActividad },
  });

  io.emit("actividades-actualizadas", {
    action: "delete",
    msg: `Actividad eliminada: ${nombreActividad}`,
  });

  return actividadEliminada;
};

module.exports = {
  obtenerActividades,
  obtenerActividadPorId,
  obtenerActividadesPorApp,
  obtenerActividadesPorSuite,
  obtenerActividadesPorModulo,
  crearActividad,
  actualizarActividad,
  eliminarActividad,
};
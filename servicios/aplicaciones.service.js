const sequelize = require("../database/connection");
const PTLAplicaciones = require("../models/aplicacion")(sequelize);
const { io } = require('../index');

const obtenerAplicaciones = async () => {
  return await PTLAplicaciones.findAll();
};

const obtenerAplicacionPorIdOCodigo = async (codigoAplicacion) => {
  // Sirve tanto para ID como para Código según tu lógica original
  return await PTLAplicaciones.findOne({
    where: { codigoAplicacion },
  });
};

const crearAplicacion = async (data) => {
  const existente = await PTLAplicaciones.findOne({
    where: { codigoAplicacion: data.codigoAplicacion }
  });
  const existeNombre = await PTLAplicaciones.findOne({
    where: { nombreAplicacion: data.nombreAplicacion }
  });

  // Validaciones de negocio: Lanzamos un error personalizado
  if (existente) {
    throw { statusCode: 400, msg: 'Ya existe una aplicación con ese código' };
  }
  if (existeNombre) {
    throw { statusCode: 400, msg: 'Ya existe una aplicación con ese nombre' };
  }

  const aplicacionDB = await PTLAplicaciones.create(data);

  io.emit('aplicaciones-actualizadas', {
    action: 'create',
    msg: `Aplicación creada: ${aplicacionDB.nombreAplicacion}`
  });

  return aplicacionDB;
};

const actualizarAplicacion = async (codigoAplicacion, data, usuarioId) => {
  const aplicacionDB = await PTLAplicaciones.findOne({
    where: { codigoAplicacion }
  });

  if (!aplicacionDB) {
    throw { statusCode: 404, msg: 'No existe una aplicación con ese ID' };
  }

  data.codigoUsuarioModificacion = usuarioId || 0;
  data.fechaModificacion = new Date().toISOString();

  await PTLAplicaciones.update(data, {
    where: { codigoAplicacion }
  });

  const aplicacionActualizada = await PTLAplicaciones.findOne({ where: { codigoAplicacion } });

  io.emit('aplicaciones-actualizadas', {
    action: 'update',
    msg: `Aplicación actualizada: ${aplicacionActualizada.nombreAplicacion}`
  });

  return aplicacionActualizada;
};

const eliminarAplicacion = async (codigoAplicacion) => {
  const aplicacionDB = await PTLAplicaciones.findOne({
    where: { codigoAplicacion }
  });

  if (!aplicacionDB) {
    throw { statusCode: 404, msg: 'No existe una aplicación con ese ID' };
  }

  const nombreAplicacion = aplicacionDB.nombreAplicacion;

  await PTLAplicaciones.destroy({
    where: { codigoAplicacion }
  });

  io.emit('aplicaciones-actualizadas', {
    action: 'delete',
    msg: `Aplicación eliminada: ${nombreAplicacion}`
  });

  return aplicacionDB; // Retornamos la app eliminada por si el controlador la necesita
};

module.exports = {
  obtenerAplicaciones,
  obtenerAplicacionPorIdOCodigo,
  crearAplicacion,
  actualizarAplicacion,
  eliminarAplicacion
};
const sequelize = require('../database/connection');
const PTLConexionesBD = require('../models/conexion-bd')(sequelize);
const { io } = require('../index');

const obtenerConexiones = async () => {
  return await PTLConexionesBD.findAll();
};

const obtenerConexionPorId = async (codigoConexion) => {
  const conexion = await PTLConexionesBD.findOne({
    where: { codigoConexion },
  });

  if (!conexion) {
    throw { statusCode: 404, msg: "No existe una conexion por ese id" };
  }

  return conexion;
};

const crearConexion = async (data) => {
  const conexionDB = await PTLConexionesBD.create(data);

  // Corregido el signo de igual (=) por un guion (-)
  io.emit('conexiones-db-actualizadas', {
    action: 'create',
    msg: `Conexión BD creada: ${conexionDB.nombreConexion}`
  });

  return conexionDB;
};

const actualizarConexion = async (codigoConexion, data) => {
  const conexionDB = await PTLConexionesBD.findOne({
    where: { codigoConexion }
  });

  if (!conexionDB) {
    throw { statusCode: 404, msg: 'No existe una conexion con ese ID' };
  }

  await PTLConexionesBD.update(data, {
    where: { codigoConexion }
  });

  const conexionActualizada = await PTLConexionesBD.findOne({
    where: { codigoConexion }
  });

  io.emit('conexiones-db-actualizadas', {
    action: 'update',
    msg: `Conexión BD actualizada: ${conexionActualizada.nombreConexion}`
  });

  return conexionActualizada;
};

const eliminarConexion = async (codigoConexion) => {
  const conexionDB = await PTLConexionesBD.findOne({
    where: { codigoConexion }
  });

  if (!conexionDB) {
    throw { statusCode: 404, msg: 'No existe una conexion con ese ID' };
  }

  const conexionEliminada = await PTLConexionesBD.destroy({
    where: { codigoConexion }
  });

  io.emit('conexiones-db-actualizadas', {
    action: 'delete',
    msg: `Conexión BD eliminada correctamente`
  });

  return conexionEliminada;
};

module.exports = {
  obtenerConexiones,
  obtenerConexionPorId,
  crearConexion,
  actualizarConexion,
  eliminarConexion,
};
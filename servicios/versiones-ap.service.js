const sequelize = require('../database/connection');
const PTLVersionesAP = require('../models/version-ap')(sequelize);
const { io } = require('../index');

const obtenerVersionesAP = async () => {
  return await PTLVersionesAP.findAll();
};

const obtenerVersionAPPorId = async (codigoVersion) => {
  const version = await PTLVersionesAP.findOne({
    where: { codigoVersion },
  });

  if (!version) {
    throw { statusCode: 404, msg: "No existe una versionAP por ese id" };
  }

  return version;
};

const crearVersionAP = async (data) => {
  const nuevaVersion = await PTLVersionesAP.create(data);

  io.emit("versiones-actualizados", {
    action: "create",
    msg: `Versión creada: ${nuevaVersion.nombreVersion}`, // Corregido género (creada)
  });

  return nuevaVersion;
};

const actualizarVersionAP = async (codigoVersion, data) => {
  const versionDB = await PTLVersionesAP.findOne({
    where: { codigoVersion },
  });

  if (!versionDB) {
    throw { statusCode: 404, msg: "No existe una versionAP por ese id" };
  }

  // Pasamos la data directamente, es más limpio que mapear propiedad por propiedad
  await PTLVersionesAP.update(data, {
    where: { codigoVersion }
  });

  const versionAPActualizada = await PTLVersionesAP.findOne({
    where: { codigoVersion }
  });

  io.emit("versiones-actualizados", {
    action: "update",
    msg: `Versión actualizada: ${versionAPActualizada.nombreVersion}`, // Corregido typo 'actulozada'
  });

  return versionAPActualizada;
};

const eliminarVersionAP = async (codigoVersion) => {
  const versionDB = await PTLVersionesAP.findOne({
    where: { codigoVersion },
  });

  if (!versionDB) {
    throw { statusCode: 404, msg: "No existe una versionAP por ese id" }; // Corregido 'versionesId'
  }

  // Guardamos el nombre de la versión antes de eliminarla para emitirla por sockets
  const nombreVersionEliminada = versionDB.nombreVersion;

  const versionAPEliminada = await PTLVersionesAP.destroy({
    where: { codigoVersion }
  });

  io.emit("versiones-actualizados", {
    action: "delete",
    msg: `Versión eliminada: ${nombreVersionEliminada}`, // Corregido bug de lectura (undefined)
  });

  return versionAPEliminada;
};

module.exports = {
  obtenerVersionesAP,
  obtenerVersionAPPorId,
  crearVersionAP,
  actualizarVersionAP,
  eliminarVersionAP,
};
const sequelize = require("../database/connection");
const PTLTiposScripts = require("../models/tipo-script")(sequelize);
const { io } = require("../index");

const obtenerTiposScripts = async () => {
  return await PTLTiposScripts.findAll();
};

const obtenerTipoScriptPorId = async (codigoTipo) => {
  const tipoScript = await PTLTiposScripts.findOne({
    where: { codigoTipo },
  });

  if (!tipoScript) {
    throw { statusCode: 404, msg: "No existe un tipo de script con ese id" };
  }

  return tipoScript;
};

const crearTipoScript = async (data) => {
  const tipoScriptDB = await PTLTiposScripts.create(data);

  io.emit("tiposScripts-actualizados", {
    action: "create",
    msg: `Tipo de script creado: ${tipoScriptDB.nombreTipo}`,
  });

  return tipoScriptDB;
};

const actualizarTipoScript = async (codigoTipo, data) => {
  const tipoScriptDB = await PTLTiposScripts.findOne({
    where: { codigoTipo },
  });

  if (!tipoScriptDB) {
    throw { statusCode: 404, msg: "No existe un tipo de script con ese ID" };
  }

  await PTLTiposScripts.update(data, {
    where: { codigoTipo },
  });

  const tipoScriptActualizado = await PTLTiposScripts.findOne({
    where: { codigoTipo },
  });

  io.emit("tiposScripts-actualizados", {
    action: "update",
    msg: `Tipo de script actualizado: ${tipoScriptActualizado.nombreTipo}`,
  });

  return tipoScriptActualizado;
};

const eliminarTipoScript = async (codigoTipo) => {
  const tipoScriptDB = await PTLTiposScripts.findOne({
    where: { codigoTipo },
  });

  if (!tipoScriptDB) {
    throw { statusCode: 404, msg: "No existe un tipo de script con ese ID" };
  }

  // Guardamos el nombre antes de borrarlo para enviarlo por el socket
  const nombreTipoScript = tipoScriptDB.nombreTipo;

  const tipoScriptEliminado = await PTLTiposScripts.destroy({
    where: { codigoTipo },
  });

  io.emit("tiposScripts-actualizados", {
    action: "delete",
    msg: `Tipo de script eliminado: ${nombreTipoScript}`, // Mensaje más dinámico
  });

  return tipoScriptEliminado;
};

module.exports = {
  obtenerTiposScripts,
  obtenerTipoScriptPorId,
  crearTipoScript,
  actualizarTipoScript,
  eliminarTipoScript,
};
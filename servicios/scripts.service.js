const sequelize = require("../database/connection");
const PTLScripts = require("../models/scripts")(sequelize);
const { io } = require("../index");

const obtenerScripts = async () => {
  return await PTLScripts.findAll();
};

const obtenerScriptPorId = async (codigoScript) => {
  const script = await PTLScripts.findOne({
    where: { codigoScript },
  });

  if (!script) {
    throw { statusCode: 404, msg: "No existe un script con ese id" };
  }

  return script;
};

const crearScript = async (data) => {
  const scriptDB = await PTLScripts.create(data);

  io.emit("scripts-actualizados", {
    action: "create",
    msg: `Script creado: ${scriptDB.nombreScript}`,
  });

  return scriptDB;
};

const actualizarScript = async (codigoScript, data) => {
  const scriptDB = await PTLScripts.findOne({
    where: { codigoScript },
  });

  if (!scriptDB) {
    throw { statusCode: 404, msg: "No existe un script con ese ID" };
  }

  await PTLScripts.update(data, {
    where: { codigoScript },
  });

  const scriptActualizado = await PTLScripts.findOne({
    where: { codigoScript },
  });

  io.emit("scripts-actualizados", {
    action: "update",
    msg: `Script actualizado: ${scriptActualizado.nombreScript}`,
  });

  return scriptActualizado;
};

const eliminarScript = async (codigoScript) => {
  const scriptDB = await PTLScripts.findOne({
    where: { codigoScript },
  });

  if (!scriptDB) {
    throw { statusCode: 404, msg: "No existe un script con ese ID" };
  }

  // Guardamos el nombre antes de destruirlo para enviarlo por el socket
  const nombreScriptEliminado = scriptDB.nombreScript;

  const scriptEliminado = await PTLScripts.destroy({
    where: { codigoScript },
  });

  io.emit("scripts-actualizados", {
    action: "delete",
    msg: `Script eliminado: ${nombreScriptEliminado}`, // Mensaje más dinámico
  });

  return scriptEliminado;
};

module.exports = {
  obtenerScripts,
  obtenerScriptPorId,
  crearScript,
  actualizarScript,
  eliminarScript,
};
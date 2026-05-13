const sequelize = require("../database/connection");
const PTLTipoGaleria = require("../models/tipo-galeria")(sequelize);
const { io } = require("../index");

const obtenerTiposGaleria = async () => {
  return await PTLTipoGaleria.findAll();
};

const obtenerTipoGaleriaPorId = async (codigoTipo) => {
  const tipoGaleria = await PTLTipoGaleria.findOne({
    where: { codigoTipo },
  });

  if (!tipoGaleria) {
    throw { statusCode: 404, msg: "No existe un tipo de galería con ese id" };
  }

  return tipoGaleria;
};

const crearTipoGaleria = async (data) => {
  const tipoGaleriaDB = await PTLTipoGaleria.create(data);

  io.emit("tiposGaleria-actualizadas", {
    action: "create",
    // Nota: Verifica si la propiedad es nombreTipoGaleria o nombreTipo según tu modelo
    msg: `Tipo de Galería creado: ${tipoGaleriaDB.nombreTipo || tipoGaleriaDB.nombreTipoGaleria}`,
  });

  return tipoGaleriaDB;
};

const actualizarTipoGaleria = async (codigoTipo, data) => {
  const tipoGaleriaDB = await PTLTipoGaleria.findOne({
    where: { codigoTipo },
  });

  if (!tipoGaleriaDB) {
    throw { statusCode: 404, msg: "No existe un tipo de galería con ese ID" };
  }

  await PTLTipoGaleria.update(data, {
    where: { codigoTipo },
  });

  const tipoGaleriaActualizado = await PTLTipoGaleria.findOne({
    where: { codigoTipo },
  });

  io.emit("tiposGaleria-actualizadas", {
    action: "update",
    msg: `Tipo de Galería actualizado: ${tipoGaleriaActualizado.nombreTipo || tipoGaleriaActualizado.nombreTipoGaleria}`,
  });

  return tipoGaleriaActualizado;
};

const eliminarTipoGaleria = async (codigoTipo) => {
  const tipoGaleriaDB = await PTLTipoGaleria.findOne({
    where: { codigoTipo },
  });

  if (!tipoGaleriaDB) {
    throw { statusCode: 404, msg: "No existe un tipo de galería con ese ID" };
  }

  // Guardamos el nombre antes de eliminar para emitirlo en el socket
  const nombreGaleria = tipoGaleriaDB.nombreTipo || tipoGaleriaDB.nombreTipoGaleria;

  const tipoGaleriaEliminado = await PTLTipoGaleria.destroy({
    where: { codigoTipo },
  });

  io.emit("tiposGaleria-actualizadas", {
    action: "delete",
    msg: `Tipo de Galería eliminado: ${nombreGaleria}`, // Mensaje dinámico
  });

  return tipoGaleriaEliminado;
};

module.exports = {
  obtenerTiposGaleria,
  obtenerTipoGaleriaPorId,
  crearTipoGaleria,
  actualizarTipoGaleria,
  eliminarTipoGaleria,
};
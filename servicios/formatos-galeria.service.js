const sequelize = require("../database/connection");
const PTLFormatoGaleria = require("../models/formato-galeria")(sequelize);
const { io } = require("../index");

const obtenerFormatosGaleria = async () => {
  return await PTLFormatoGaleria.findAll();
};

const obtenerFormatoGaleriaPorId = async (codigoFormato) => {
  const formatoGaleria = await PTLFormatoGaleria.findOne({
    where: { codigoFormato },
  });

  if (!formatoGaleria) {
    throw { statusCode: 404, msg: "No existe un formato de galería con ese id" };
  }

  return formatoGaleria;
};

const crearFormatoGaleria = async (data) => {
  const formatoGaleriaDB = await PTLFormatoGaleria.create(data);

  io.emit("formatos-galeria-actualizadas", {
    action: "create",
    msg: `Formato de Galería creado: ${formatoGaleriaDB.nombreFormato}`,
  });

  return formatoGaleriaDB;
};

const actualizarFormatoGaleria = async (codigoFormato, data) => {
  const formatoGaleriaDB = await PTLFormatoGaleria.findOne({
    where: { codigoFormato },
  });

  if (!formatoGaleriaDB) {
    throw { statusCode: 404, msg: "No existe un formato de galería con ese ID" };
  }

  await PTLFormatoGaleria.update(data, {
    where: { codigoFormato },
  });

  const formatoGaleriaActualizado = await PTLFormatoGaleria.findOne({
    where: { codigoFormato },
  });

  io.emit("formatos-galeria-actualizadas", {
    action: "update",
    msg: `Formato de Galería actualizado: ${formatoGaleriaActualizado.nombreFormato}`,
  });

  return formatoGaleriaActualizado;
};

const eliminarFormatoGaleria = async (codigoFormato) => {
  const formatoGaleriaDB = await PTLFormatoGaleria.findOne({
    where: { codigoFormato },
  });

  if (!formatoGaleriaDB) {
    throw { statusCode: 404, msg: "No existe un formato de galería con ese ID" };
  }

  const formatoGaleriaEliminado = await PTLFormatoGaleria.destroy({
    where: { codigoFormato },
  });

  io.emit("formatos-galeria-actualizadas", {
    action: "delete",
    msg: `Formato de Galería eliminado correctamente`,
  });

  return formatoGaleriaEliminado;
};

module.exports = {
  obtenerFormatosGaleria,
  obtenerFormatoGaleriaPorId,
  crearFormatoGaleria,
  actualizarFormatoGaleria,
  eliminarFormatoGaleria,
};
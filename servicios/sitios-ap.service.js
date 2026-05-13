const sequelize = require('../database/connection');
const PTLSitiosAP = require('../models/sitio-ap')(sequelize);
const { io } = require('../index');

const obtenerSitios = async () => {
  return await PTLSitiosAP.findAll();
};

const obtenerSitioPorId = async (codigoSitio) => {
  const sitio = await PTLSitiosAP.findOne({
    where: { codigoSitio },
  });

  if (!sitio) {
    throw { statusCode: 404, msg: "No existe un sitio por ese id" };
  }

  return sitio;
};

const crearSitio = async (data) => {
  const existeNombre = await PTLSitiosAP.findOne({
    where: { nombreSitio: data.nombreSitio }
  });

  if (existeNombre) {
    throw { statusCode: 400, msg: 'Ya existe un sitio con ese nombre' };
  }

  const sitioDB = await PTLSitiosAP.create(data);

  io.emit('sitios-ap-actualizados', {
    action: 'create',
    msg: `Sitio creado: ${sitioDB.nombreSitio}`
  });

  return sitioDB;
};

const actualizarSitio = async (codigoSitio, data) => {
  const sitioDB = await PTLSitiosAP.findOne({
    where: { codigoSitio }
  });

  if (!sitioDB) {
    throw { statusCode: 404, msg: 'No existe un sitio con ese ID' };
  }

  await PTLSitiosAP.update(data, {
    where: { codigoSitio }
  });

  const sitioActualizado = await PTLSitiosAP.findOne({
    where: { codigoSitio }
  });

  io.emit('sitios-ap-actualizados', {
    action: 'update',
    msg: `Sitio actualizado: ${sitioActualizado.nombreSitio}`
  });

  return sitioActualizado;
};

const eliminarSitio = async (codigoSitio) => {
  const sitioDB = await PTLSitiosAP.findOne({
    where: { codigoSitio }
  });

  if (!sitioDB) {
    throw { statusCode: 404, msg: 'No existe un sitio con ese ID' };
  }

  const nombreSitio = sitioDB.nombreSitio;

  const sitioEliminado = await PTLSitiosAP.destroy({
    where: { codigoSitio }
  });

  io.emit('sitios-ap-actualizados', {
    action: 'delete',
    msg: `Sitio eliminado: ${nombreSitio}`
  });

  return sitioEliminado;
};

module.exports = {
  obtenerSitios,
  obtenerSitioPorId,
  crearSitio,
  actualizarSitio,
  eliminarSitio,
};
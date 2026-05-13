const sequelize = require('../database/connection');
const PTLIdiomas = require('../models/idioma')(sequelize);
const { io } = require('../index');

const obtenerIdiomas = async () => {
  return await PTLIdiomas.findAll();
};

const obtenerIdiomaPorId = async (codigoIdioma) => {
  const idioma = await PTLIdiomas.findOne({
    where: { codigoIdioma },
  });

  if (!idioma) {
    throw { statusCode: 404, msg: "No existe un idioma por ese codigo" };
  }

  return idioma;
};

const crearIdioma = async (data) => {
  const existeSigla = await PTLIdiomas.findOne({
    where: { siglaIdioma: data.siglaIdioma }
  });

  if (existeSigla) {
    throw { statusCode: 400, msg: `La sigla ${data.siglaIdioma} ya está registrada` };
  }

  const nuevo = await PTLIdiomas.create(data);

  if (typeof io !== 'undefined') {
    io.emit('idiomas-actualizados', {
      action: 'create',
      msg: `Idioma creado: ${nuevo.nombreIdioma}`
    });
  } else {
    console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
  }

  return nuevo;
};

const actualizarIdioma = async (codigoIdioma, data) => {
  const idiomaDB = await PTLIdiomas.findOne({
    where: { codigoIdioma },
  });

  if (!idiomaDB) {
    throw { statusCode: 404, msg: "No existe un Idioma por ese id" };
  }

  await PTLIdiomas.update(data, {
    where: { codigoIdioma },
  });

  const idiomaActualizado = await PTLIdiomas.findOne({
    where: { codigoIdioma },
  });

  io.emit('idiomas-actualizados', {
    action: 'update',
    msg: `Idioma actualizado: ${idiomaActualizado.nombreIdioma}` // Corregido 'actualozado'
  });

  return idiomaActualizado;
};

const eliminarIdioma = async (codigoIdioma) => {
  const idiomaDB = await PTLIdiomas.findOne({
    where: { codigoIdioma },
  });

  if (!idiomaDB) {
    throw { statusCode: 404, msg: "No existe un idioma por ese id" };
  }

  const idiomaEliminado = await PTLIdiomas.destroy({
    where: { codigoIdioma },
  });

  io.emit('idiomas-actualizados', { // Corregido de singular 'idioma-actualizados' a plural
    action: 'delete',
    msg: `Idioma eliminado: ${idiomaDB.nombreIdioma}`
  });

  return idiomaEliminado;
};

module.exports = {
  obtenerIdiomas,
  obtenerIdiomaPorId,
  crearIdioma,
  actualizarIdioma,
  eliminarIdioma,
};
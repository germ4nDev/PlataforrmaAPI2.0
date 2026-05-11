const sequelize = require('../database/connection');
const PTLTextosID = require('../models/texto-id')(sequelize);
const { io } = require('../index');

const obtenerTextos = async () => {
  return await PTLTextosID.findAll();
};

const obtenerTextoPorId = async (textoId) => {
  const texto = await PTLTextosID.findOne({
    where: { textoId },
  });

  if (!texto) {
    throw { statusCode: 404, msg: "No existe un textoID con ese id" };
  }

  return texto;
};

const crearTexto = async (data) => {
  const nuevoTexto = await PTLTextosID.create(data);

  io.emit('textos-actualizados', {
    action: 'create',
    msg: `Texto creado: ${nuevoTexto.anclaTexto}`
  });

  return nuevoTexto;
};

const actualizarTexto = async (textoId, data) => {
  const textoDB = await PTLTextosID.findOne({
    where: { textoId }
  });

  if (!textoDB) {
    throw { statusCode: 404, msg: 'No existe un texto con ese ID' };
  }

  await PTLTextosID.update(data, {
    where: { textoId }
  });

  const textoActualizado = await PTLTextosID.findOne({
    where: { textoId }
  });

  io.emit('textos-actualizados', {
    action: 'update',
    msg: `Texto actualizado: ${textoActualizado.anclaTexto}`
  });

  return textoActualizado;
};

const eliminarTexto = async (textoId) => {
  const textoDB = await PTLTextosID.findOne({
    where: { textoId }
  });

  if (!textoDB) {
    throw { statusCode: 404, msg: 'No existe un texto con ese ID' };
  }

  const textoEliminado = await PTLTextosID.destroy({
    where: { textoId }
  });

  io.emit('textos-actualizados', {
    action: 'delete',
    msg: `Texto eliminado correctamente` // Corregido el typo "Tecto"
  });

  return textoEliminado;
};

module.exports = {
  obtenerTextos,
  obtenerTextoPorId,
  crearTexto,
  actualizarTexto,
  eliminarTexto,
};
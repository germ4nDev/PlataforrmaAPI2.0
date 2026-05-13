const sequelize = require('../database/connection');
const PTLPaquetesSC = require('../models/paquete-sc')(sequelize);
const { io } = require('../index');

const obtenerPaquetesSC = async () => {
  return await PTLPaquetesSC.findAll();
};

const obtenerPaqueteSCPorId = async (suscriptorPaqueteId) => {
  const suscriptorPaquete = await PTLPaquetesSC.findOne({
    where: { suscriptorPaqueteId },
  });

  if (!suscriptorPaquete) {
    throw { statusCode: 404, msg: "No existe un suscriptorPaquete por ese id" };
  }

  return suscriptorPaquete;
};

const crearPaqueteSC = async (data) => {
  const paqueteSCDB = await PTLPaquetesSC.create(data);

  io.emit('paquetes-sc-actualizados', {
    action: 'create',
    msg: `Paquete SC creado: ${paqueteSCDB.suscriptorPaqueteId}` // Corregido el typo
  });

  return paqueteSCDB;
};

const actualizarPaqueteSC = async (suscriptorPaqueteId, data) => {
  const paqueteSCDB = await PTLPaquetesSC.findOne({
    where: { suscriptorPaqueteId }
  });

  if (!paqueteSCDB) {
    throw { statusCode: 404, msg: 'No existe un suscriptorPaquete con ese ID' };
  }

  await PTLPaquetesSC.update(data, {
    where: { suscriptorPaqueteId }
  });

  const suscriptorPaqueteActualizado = await PTLPaquetesSC.findOne({
    where: { suscriptorPaqueteId }
  });

  io.emit('paquetes-sc-actualizados', {
    action: 'update',
    msg: `Paquete SC actualizado: ${suscriptorPaqueteActualizado.suscriptorPaqueteId}` // Corregido typo
  });

  return suscriptorPaqueteActualizado;
};

const eliminarPaqueteSC = async (suscriptorPaqueteId) => {
  const paqueteSCDB = await PTLPaquetesSC.findOne({
    where: { suscriptorPaqueteId }
  });

  if (!paqueteSCDB) {
    throw { statusCode: 404, msg: 'No existe un suscriptorPaquete con ese ID' };
  }

  // Guardamos el ID antes de eliminar para poder enviarlo en el socket
  const idEliminado = paqueteSCDB.suscriptorPaqueteId;

  const suscriptorPaqueteEliminado = await PTLPaquetesSC.destroy({
    where: { suscriptorPaqueteId }
  });

  io.emit('paquetes-sc-actualizados', {
    action: 'delete',
    msg: `Paquete SC eliminado: ${idEliminado}`
  });

  return suscriptorPaqueteEliminado;
};

module.exports = {
  obtenerPaquetesSC,
  obtenerPaqueteSCPorId,
  crearPaqueteSC,
  actualizarPaqueteSC,
  eliminarPaqueteSC,
};
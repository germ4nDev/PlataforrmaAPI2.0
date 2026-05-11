const sequelize = require('../database/connection');
const PTLRequerimientosTK = require('../models/requerimiento')(sequelize);
const { io } = require('../index');

const obtenerRequerimientos = async () => {
  return await PTLRequerimientosTK.findAll();
};

const obtenerRequerimientoPorId = async (codigoRequerimiento) => {
  const requerimiento = await PTLRequerimientosTK.findOne({
    where: { codigoRequerimiento },
  });

  if (!requerimiento) {
    throw { statusCode: 404, msg: "No existe un requerimiento por ese id" };
  }

  return requerimiento;
};

const crearRequerimiento = async (data) => {
  const requerimientoDB = await PTLRequerimientosTK.create(data);

  io.emit('requerimientos-actualizados', {
    action: 'create',
    msg: `Requerimiento creado: ${requerimientoDB.nombreRequerimiento}` // Corregido el typo "Requerimineto"
  });

  return requerimientoDB;
};

const actualizarRequerimiento = async (codigoRequerimiento, data) => {
  const requerimientoDB = await PTLRequerimientosTK.findOne({
    where: { codigoRequerimiento }
  });

  if (!requerimientoDB) {
    throw { statusCode: 404, msg: 'No existe un requerimiento con ese ID' };
  }

  await PTLRequerimientosTK.update(data, {
    where: { codigoRequerimiento }
  });

  const requerimientoActualizado = await PTLRequerimientosTK.findOne({
    where: { codigoRequerimiento }
  });

  io.emit('requerimientos-actualizados', {
    action: 'update',
    msg: `Requerimiento actualizado: ${requerimientoActualizado.nombreRequerimiento}` // Corregido typo
  });

  return requerimientoActualizado;
};

const eliminarRequerimiento = async (codigoRequerimiento) => {
  const requerimientoDB = await PTLRequerimientosTK.findOne({
    where: { codigoRequerimiento }
  });

  if (!requerimientoDB) {
    throw { statusCode: 404, msg: 'No existe un requerimiento con ese ID' };
  }

  const nombreReq = requerimientoDB.nombreRequerimiento;

  const requerimientoEliminado = await PTLRequerimientosTK.destroy({
    where: { codigoRequerimiento }
  });

  io.emit('requerimientos-actualizados', {
    action: 'delete',
    msg: `Requerimiento eliminado: ${nombreReq}` // Corregido typo
  });

  return requerimientoEliminado;
};

module.exports = {
  obtenerRequerimientos,
  obtenerRequerimientoPorId,
  crearRequerimiento,
  actualizarRequerimiento,
  eliminarRequerimiento,
};
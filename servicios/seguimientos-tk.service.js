const sequelize = require('../database/connection');
const PTLSeguimientosTK = require('../models/seguimiento')(sequelize);
const { io } = require('../index');

const obtenerSeguimientos = async () => {
  return await PTLSeguimientosTK.findAll();
};

const obtenerSeguimientoPorId = async (codigoSeguimiento) => {
  const seguimiento = await PTLSeguimientosTK.findOne({
    where: { codigoSeguimiento },
  });

  if (!seguimiento) {
    throw { statusCode: 404, msg: "No existe un seguimiento por ese id" };
  }

  return seguimiento;
};

const obtenerSeguimientosPorTicket = async (codigoTicket) => {
  return await PTLSeguimientosTK.findAll({
    where: { codigoTicket },
  });
};

const crearSeguimiento = async (data) => {
  const seguimientoDB = await PTLSeguimientosTK.create(data);

  // Corregido el typo "seguijmientos" a "seguimientos"
  io.emit('seguimientos-tk-actualizados', {
    action: 'create',
    msg: `Seguimiento creado: ${seguimientoDB.codigoSeguimiento}`
  });

  return seguimientoDB;
};

const actualizarSeguimiento = async (codigoSeguimiento, data) => {
  const seguimientoDB = await PTLSeguimientosTK.findOne({
    where: { codigoSeguimiento }
  });

  if (!seguimientoDB) {
    throw { statusCode: 404, msg: 'No existe un seguimiento con ese ID' };
  }

  await PTLSeguimientosTK.update(data, {
    where: { codigoSeguimiento }
  });

  const seguimientoActualizado = await PTLSeguimientosTK.findOne({
    where: { codigoSeguimiento }
  });

  io.emit('seguimientos-tk-actualizados', {
    action: 'update',
    msg: `Seguimiento actualizado: ${seguimientoActualizado.codigoSeguimiento}`
  });

  return seguimientoActualizado;
};

const eliminarSeguimiento = async (codigoSeguimiento) => {
  const seguimientoDB = await PTLSeguimientosTK.findOne({
    where: { codigoSeguimiento }
  });

  if (!seguimientoDB) {
    throw { statusCode: 404, msg: 'No existe un seguimiento con ese ID' };
  }

  const seguimientoEliminado = await PTLSeguimientosTK.destroy({
    where: { codigoSeguimiento }
  });

  io.emit('seguimientos-tk-actualizados', {
    action: 'delete',
    msg: `Seguimiento eliminado: ${seguimientoDB.codigoSeguimiento}`
  });

  return seguimientoEliminado;
};

module.exports = {
  obtenerSeguimientos,
  obtenerSeguimientoPorId,
  obtenerSeguimientosPorTicket,
  crearSeguimiento,
  actualizarSeguimiento,
  eliminarSeguimiento,
};
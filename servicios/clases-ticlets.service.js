const sequelize = require('../database/connection');
const PTLClasesTicket = require('../models/clase-ticket')(sequelize);
const { io } = require('../index');

const obtenerClasesTicket = async () => {
  return await PTLClasesTicket.findAll();
};

const obtenerClaseTicketPorId = async (codigoClase) => {
  const claseTicket = await PTLClasesTicket.findOne({
    where: { codigoClase },
  });

  if (!claseTicket) {
    throw { statusCode: 404, msg: "No existe una claseTicket por ese id" };
  }

  return claseTicket;
};

const crearClaseTicket = async (data) => {
  const claseTicketDB = await PTLClasesTicket.create(data);

  io.emit('clases-tickets-actualizadas', {
    action: 'create',
    msg: `Clase Ticket creada: ${claseTicketDB.claseTicket}`
  });

  return claseTicketDB;
};

const actualizarClaseTicket = async (codigoClase, data) => {
  const claseTicketDB = await PTLClasesTicket.findOne({
    where: { codigoClase }
  });

  if (!claseTicketDB) {
    throw { statusCode: 404, msg: 'No existe una claseTicket con ese ID' };
  }

  await PTLClasesTicket.update(data, {
    where: { codigoClase }
  });

  const claseTicketActualizado = await PTLClasesTicket.findOne({
    where: { codigoClase }
  });

  io.emit('clases-tickets-actualizadas', {
    action: 'update',
    msg: `Clase Ticket actualizada: ${claseTicketActualizado.claseTicket}`
  });

  return claseTicketActualizado;
};

const eliminarClaseTicket = async (codigoClase) => {
  const claseTicketDB = await PTLClasesTicket.findOne({
    where: { codigoClase }
  });

  if (!claseTicketDB) {
    throw { statusCode: 404, msg: 'No existe un claseTicket con ese ID' };
  }

  const claseTicketEliminado = await PTLClasesTicket.destroy({
    where: { codigoClase }
  });

  io.emit('clases-tickets-actualizadas', {
    action: 'delete',
    msg: `Clase Ticket eliminada correctamente`
  });

  return claseTicketEliminado;
};

module.exports = {
  obtenerClasesTicket,
  obtenerClaseTicketPorId,
  crearClaseTicket,
  actualizarClaseTicket,
  eliminarClaseTicket,
};
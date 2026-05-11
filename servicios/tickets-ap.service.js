const sequelize = require('../database/connection');
const PTLTicketsAP = require('../models/ticket-ap')(sequelize); // Corregido el nombre de variable a PTLTicketsAP
const { io } = require('../index');

const obtenerTicketsAP = async () => {
  return await PTLTicketsAP.findAll();
};

const obtenerTicketAPPorId = async (codigoTicket) => {
  const ticket = await PTLTicketsAP.findOne({
    where: { codigoTicket },
  });

  if (!ticket) {
    throw { statusCode: 404, msg: "No existe un ticket por ese id" };
  }

  return ticket;
};

const crearTicketAP = async (data) => {
  const nuevoTicket = await PTLTicketsAP.create(data);

  io.emit('tickets-ap-actualizados', { // Corregido: antes decía 'textos-actualizados'
    action: 'create',
    msg: `Ticket creado: ${nuevoTicket.nombreTicket}`
  });

  return nuevoTicket;
};

const actualizarTicketAP = async (codigoTicket, data) => {
  const ticketDB = await PTLTicketsAP.findOne({
    where: { codigoTicket }
  });

  if (!ticketDB) {
    throw { statusCode: 404, msg: 'No existe un ticket con ese ID' };
  }

  await PTLTicketsAP.update(data, {
    where: { codigoTicket }
  });

  const ticketActualizado = await PTLTicketsAP.findOne({
    where: { codigoTicket }
  });

  io.emit('tickets-ap-actualizados', { // Corregido: antes decía 'textos-actualizados'
    action: 'update',
    msg: `Ticket actualizado: ${ticketActualizado.nombreTicket}` // Corregido typo
  });

  return ticketActualizado;
};

const eliminarTicketAP = async (codigoTicket) => {
  const ticketDB = await PTLTicketsAP.findOne({
    where: { codigoTicket }
  });

  if (!ticketDB) {
    throw { statusCode: 404, msg: 'No existe un ticket con ese ID' };
  }

  const nombreTicketEliminado = ticketDB.nombreTicket;

  const ticketEliminado = await PTLTicketsAP.destroy({
    where: { codigoTicket }
  });

  io.emit('tickets-ap-actualizados', { // Corregido: antes decía 'textos-actualizados'
    action: 'delete',
    msg: `Ticket eliminado: ${nombreTicketEliminado}` // Corregido el bug del undefined
  });

  return ticketEliminado;
};

module.exports = {
  obtenerTicketsAP,
  obtenerTicketAPPorId,
  crearTicketAP,
  actualizarTicketAP,
  eliminarTicketAP,
};
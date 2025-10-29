/*
    Author: German Valencia
    Actualización: John Castañeda
    Actualizado: german Valencia 20251026
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLTicketsAP = require('../models/ticket')(sequelize);

const getTicketsAP = async (req, res) => {
  try {
    const ticketsAP = await PTLTicketsAP.findAll();
    return res.status(201).json({
      ok: true,
      tickets: ticketsAP,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener TicketsAP' });
  }
};

const getTicketsAPById = async (req, res) => {
  try {
    const codigoTicket = req.params.id;
    const ticket = await PTLTicketsAP.findOne({
      where: {
        codigoTicket: codigoTicket,
      },
    });
    if (!ticket) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un ticket por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      ticket: ticket,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener ticket" });
  }
};

// Crear un nuevo ticket
const createTicketAP = async (req, res = response) => {
  try {
    const nuevoTicket = req.body;
    const ticketDB = await PTLTicketsAP.create(nuevoTicket);
    return res.status(201).json({
      ok: true,
      ticket: ticketDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el ticket'
    });
  }
};

// Actualizar un nuevo ticket
const updateTicketAP = async (req, res = response) => {
  try {
    const { codigoTicket, ...data } = req.body;
    const ticketDB = await PTLTicketsAP.findOne({
      where: { codigoTicket }
    });
    if (!ticketDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un ticket con ese ID'
      });
    }
    await PTLTicketsAP.update(data, {
      where: { codigoTicket }
    });
    const ticketActualizado = await PTLTicketsAP.findOne({ where: { codigoTicket } });
    return res.status(200).json({
      ok: true,
      ticket: ticketActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el ticket'
    });
  }
};

// Borrar un nuevo ticket
const deleteTicketAP = async (req, res = response) => {
  try {
    const codigoTicket = req.params.id;
    const ticketDB = await PTLTicketsAP.findOne({
      where: { codigoTicket }
    });
    if (!ticketDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un ticket con ese ID'
      });
    }
    const ticketEliminado = await PTLTicketsAP.destroy({
      where: { codigoTicket }
    });

    return res.status(200).json({
      ok: true,
      usuario: ticketEliminado,
      msg: 'ticket eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el ticket'
    });
  }
};

module.exports = {
  getTicketsAP,
  getTicketsAPById,
  createTicketAP,
  updateTicketAP,
  deleteTicketAP,
};

/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLTicketsAP = require('../models/ticket')(sequelize);

// Obtener todos los ticketes
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
    const { ticketId } = req.body;
    const ticket = await PTLTicketsAP.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un ticket con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      ticket: ticket,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el ticket' });
  }
};

// Crear un nuevo ticket
const createTicketAP = async (req, res = response) => {
  try {
    const ticket = req.body;
    const nuevo = await PTLTicketsAP.create(ticket);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el ticket' });
  }
};

// Actualizar un nuevo ticket
const updateTicketAP = async (req, res = response) => {
  try {
    const { ticketId } = req.body;
    const ticket = req.body;
    const ticketDB = await PTLTicketsAP.find(ticketId);
    if (!ticketDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un ticket con ese id",
      });
    }
    const ticketActualizado = await PTLTicketsAP.findByIdAndUpdate({ ticketId, ticket });
    return res.status(201).json({
      ok: true,
      ticket: ticketActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el ticket' });
  }
};

// Borrar un nuevo ticket
const deleteTicketAP = async (req, res = response) => {
  try {
    const { ticketId } = req.body;
    const ticketDB = await PTLTicketsAP.findOne(ticketId);
    if (!ticketDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un ticket con ese id",
      });
    }
    const ticketEliminado = await PTLTicketsAP.findByIdAndDelete({ ticketId });
    return res.status(201).json({
      ok: true,
      ticket: ticketEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar ticket' });
  }
};

module.exports = {
  getTicketsAP,
  getTicketsAPById,
  createTicketAP,
  updateTicketAP,
  deleteTicketAP,
};

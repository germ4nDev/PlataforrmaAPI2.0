/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const TicketAPService = require("../services/tickets-ap.service");
const service = new TicketAPService();

const getTickets = async (req, res = response) => {
    try {
        const tickets = await service.getTickets();
        res.status(200).json({ ok: true, tickets });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getTicketById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const ticket = await service.getTicketById(id);
        res.status(200).json({ ok: true, ticket });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createTicket = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const ticket = await service.createTicket({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, ticket });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateTicket = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const ticket = await service.updateTicket(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, ticket });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteTicket = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.deleteTicket(id);
        res.status(200).json({ ok: true, msg: "Ticket eliminado correctamente" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
};
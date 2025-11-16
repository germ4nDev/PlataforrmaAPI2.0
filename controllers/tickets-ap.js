/*
    Author: John Castañeda
    Actualizado: german Valencia 20251026
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLTickestAP = require('../models/ticket-ap')(sequelize);
// const PTLAplicaciones = require("../models/aplicacion")(sequelize);
const { io } = require('../index');

const getTicketsAP = async (req, res) => {
    try {
        console.log('aca');
        const tickets = await PTLTickestAP.findAll();
        console.log('todos los tickets', tickets);
        return res.status(201).json({
            ok: true,
            tickets: tickets
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener TicketsAP' });
    }
};

const getTicketsAPById = async (req, res) => {
    try {
        const codigoTicket = req.params.id;
        const ticket = await PTLTickestAP.findOne({
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
            ticketAP: ticket,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener ticket" });
    }
};

const createTicketAP = async (req, res = response) => {
    const { ...data } = req.body;
    try {
        const nuevo = await PTLTickestAP.create(data);
        return res.status(201).json({
            ok: true,
            ticketAP: nuevo,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al crear el modulo" });
    }
};

// Actualizar un nuevo ticket
const updateTicketAP = async (req, res = response) => {
    const { codigoTicket, ...data } = req.body;
    try {
        const ticketDB = await PTLTickestAP.findOne({
            where: { codigoTicket }
        });
        if (!ticketDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un ticket con ese ID'
            });
        }
        await PTLTickestAP.update(data, {
            where: { codigoTicket }
        });
        const ticketActualizado = await PTLTickestAP.findOne({
            where: { codigoTicket },
        });
        return res.status(201).json({
            ok: true,
            ticketAP: ticketActualizado,
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
        const ticketDB = await PTLTickestAP.findOne({
            where: { codigoTicket }
        });
        if (!ticketDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un ticket con ese ID'
            });
        }
        const ticketEliminado = await PTLTickestAP.destroy({
            where: { codigoTicket }
        });

        return res.status(200).json({
            ok: true,
            ticketAP: ticketEliminado,
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

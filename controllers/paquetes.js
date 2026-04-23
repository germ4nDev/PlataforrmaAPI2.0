/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLPaquetes = require('../models/paquete')(sequelize);
const { io } = require('../index');

const getPaquetes = async(req, res) => {
    try {
        const paquetes = await PTLPaquetes.findAll();
        return res.status(201).json({
            ok: true,
            paquetes: paquetes,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener Paquetes' });
    }
};

const getPaqueteById = async(req, res) => {
    try {
        const codigoPaquete = req.params.id;
        const paquete = await PTLPaquetes.findOne({
            where: { codigoPaquete },
        });
        if (!paquete) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un paquete por ese codigo",
            });
        }
        return res.status(201).json({
            ok: true,
            paquete: paquete,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener roles' });
    }
};

const createPaquete = async(req, res = response) => {
    const data = req.body;
    console.log('Datos recibidos del frontend:', data);
    try {
        const existente = await PTLPaquetes.findOne({
            where: { codigoPaquete: data.codigoPaquete }
        });
        if (existente) {
            return res.status(400).json({
                ok: false,
                msg: `El código ${data.codigoPaquete} ya está registrado`
            });
        }
        const existeNombre = await PTLPaquetes.findOne({
            where: { nombrePaquete: data.nombrePaquete }
        });
        if (existeNombre) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un paquete con ese nombre'
            });
        }
        const nuevo = await PTLPaquetes.create(data);
        if (typeof io !== 'undefined') {
            io.emit('paquetes-actualizados', {
                action: 'create',
                msg: `Paquete creado: ${nuevo.nombrePaquete}`
            });
        } else {
            console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
        }
        return res.status(201).json({
            ok: true,
            paquete: nuevo,
        });
    } catch (err) {
        console.error('--- ERROR EN CREATE PAQUETE ---');
        console.error(err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                ok: false,
                error: "Faltan campos obligatorios",
                detalles: err.errors.map(e => e.message)
            });
        }
        res.status(500).json({
            ok: false,
            error: "Error interno en el servidor",
            msg: err.message // Esto te ayudará a ver el error en Postman/Frontend
        });
    }
};

const updatePaquete = async(req, res = response) => {
    const { codigoPaquete, ...data } = req.body;
    try {
        const paqueteOg = await PTLPaquetes.findOne({
            where: { codigoPaquete },
        });
        if (!paqueteOg) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un PTLPaquetes por ese id",
            });
        }
        await PTLPaquetes.update(data, {
            where: { codigoPaquete },
        });
        const paqueteActualizado = await PTLPaquetes.findOne({
            where: { codigoPaquete },
        });
        io.emit('paquetes-actualizados', {
            action: 'update',
            msg: `Paquete actualozado: ${paqueteActualizado.nombrePaquete}`
        });
        return res.status(201).json({
            ok: true,
            paquete: paqueteActualizado,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar el modulo" });
    }
};

const deletePaquete = async(req, res = response) => {
    try {
        const codigoPaquete = req.params.id;
        const paquete = await PTLPaquetes.findOne({
            where: { codigoPaquete },
        });
        if (!paquete) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un paquete por ese id",
            });
        }
        const paqueteEliminado = await PTLPaquetes.destroy({
            where: { codigoPaquete }
        });
        io.emit('paquetes-actualizados', {
            action: 'delete',
            msg: `Paquete eliminado: ${paqueteEliminado.nombrePaquete}`
        });
        return res.status(201).json({
            ok: true,
            paquete: paqueteEliminado,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar paquete' });
    }
};

module.exports = {
    getPaquetes,
    getPaqueteById,
    createPaquete,
    updatePaquete,
    deletePaquete,
};
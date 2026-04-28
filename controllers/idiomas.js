/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLIdiomas = require('../models/idioma')(sequelize);
const { io } = require('../index');

// Obtener todos los idioma
const getIdiomas = async(req, res) => {
    try {
        const idiomas = await PTLIdiomas.findAll();
        return res.status(201).json({
            ok: true,
            idiomas: idiomas,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener idiomas' });
    }
};

const getIdiomaById = async(req, res) => {
    try {
        const codigoIdioma = req.params.id;
        console.log('codigoIdioma', codigoIdioma);
        const idioma = await PTLIdiomas.findOne({
            where: { codigoIdioma },
        });
        if (!idioma) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un idioma por ese codigo",
            });
        }
        return res.status(201).json({
            ok: true,
            idioma: idioma,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener idiomas' });
    }
};

// Crear un idioma
const createIdioma = async(req, res = response) => {
    const {...data } = req.body;
    try {
        console.log('data idioma', data);
        const existeSigla = await PTLIdiomas.findOne({
            where: { siglaIdioma: data.siglaIdioma }
        });
        if (existeSigla) {
            return res.status(400).json({
                ok: false,
                msg: `La sigla ${data.siglaIdioma} ya está registrado`
            });
        }
        const nuevo = await PTLIdiomas.create(data);
        console.log('idioma creado', nuevo);
        if (typeof io !== 'undefined') {
            io.emit('idiomas-actualizados', {
                action: 'create',
                msg: `Idioma creado: ${nuevo.nombreIdioma}`
            });
        } else {
            console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
        }
        return res.status(201).json({
            ok: true,
            idioma: nuevo,
        });
    } catch (err) {
        // 5. CRÍTICO: Imprime el error real en la consola de Node para debuguear
        console.error('--- ERROR EN CREATE PAQUETE ---');
        console.error(err);

        // Si el error es de Sequelize (base de datos)
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

// Actualizar un idioma
const updateIdioma = async(req, res = response) => {
    const codigoIdioma = req.params.id;
    const {...data } = req.body;
    console.log('codigoIdioma', codigoIdioma);
    console.log('data Idioma', data);
    try {
        const IdiomaOg = await PTLIdiomas.findOne({
            where: { codigoIdioma },
        });
        if (!IdiomaOg) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un Idioma por ese id",
            });
        }
        await PTLIdiomas.update(data, {
            where: { codigoIdioma },
        });
        const idiomaActualizado = await PTLIdiomas.findOne({
            where: { codigoIdioma },
        });
        io.emit('idiomas-actualizados', {
            action: 'update',
            msg: `idioma actualozado: ${idiomaActualizado.nombreIdioma}`
        });
        return res.status(201).json({
            ok: true,
            idioma: idiomaActualizado,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar el Idioma" });
    }
};

// Borrar un idioma
const deleteIdioma = async(req, res = response) => {
    try {
        const codigoIdioma = req.params.id;
        const Idioma = await PTLIdiomas.findOne({
            where: { codigoIdioma },
        });
        if (!Idioma) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un idioma por ese id",
            });
        }
        const IdiomaEliminado = await PTLIdiomas.destroy({
            where: { codigoIdioma },
        });
        io.emit('idioma-actualizados', {
            action: 'delete',
            msg: `idioma eliminado: ${Idioma.nombreIdioma}`
        });
        return res.status(201).json({
            ok: true,
            idioma: IdiomaEliminado,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar idioma" });
    }
};

module.exports = {
    getIdiomas,
    getIdiomaById,
    createIdioma,
    updateIdioma,
    deleteIdioma,
};
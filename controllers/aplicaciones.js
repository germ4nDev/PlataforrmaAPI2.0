/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const AplicacionesService = require("../services/aplicaciones.service");
const service = new AplicacionesService();

const getAplicaciones = async (req, res = response) => {
    try {
        const aplicaciones = await service.getAplicaciones();
        return res.status(200).json({
            ok: true,
            aplicaciones,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "Error al obtener Aplicaciones" });
    }
};

const getAplicacionById = async (req, res = response) => {
    try {
        const aplicacion = await service.getAplicacionByCode(req.params.id);

        if (!aplicacion) {
            return res.status(404).json({ ok: false, msg: "No existe una aplicación por el id" });
        }

        return res.status(200).json({
            ok: true,
            aplicacion,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "Error al obtener aplicación" });
    }
};

const getAplicacionByCode = async (req, res = response) => {
    try {
        const aplicacion = await service.getAplicacionByCode(req.params.code);

        if (!aplicacion) {
            return res.status(404).json({ ok: false, msg: "No existe una aplicación por el código" });
        }

        return res.status(200).json({
            ok: true,
            aplicacion,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "Error al obtener aplicación" });
    }
};

const createAplicacion = async (req, res = response) => {
    try {
        const aplicacionDB = await service.crearAplicacion(req.body);

        return res.status(201).json({
            ok: true,
            aplicacion: aplicacionDB
        });
    } catch (err) {
        console.error(err);
        // Si el error viene con un statusCode (ej: 400 por validación de nombre), lo usamos
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({ ok: false, error: 'Error al crear la aplicación' });
    }
};

const updateAplicacion = async (req, res = response) => {
    try {
        const { codigoAplicacion, ...data } = req.body;
        const usuarioId = req.usuario?.id;

        const aplicacionActualizada = await service.updateAplicacion(codigoAplicacion, data, usuarioId);

        return res.status(200).json({
            ok: true,
            aplicacion: aplicacionActualizada
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({ ok: false, error: 'Error al actualizar la aplicación' });
    }
};

const deleteAplicacion = async (req, res = response) => {
    try {
        const aplicacionEliminada = await service.deleteAplicacion(req.params.id);

        return res.status(200).json({
            ok: true,
            aplicacion: aplicacionEliminada,
            msg: 'Aplicación eliminada correctamente'
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({ ok: false, error: 'Error al eliminar la aplicación' });
    }
};

module.exports = {
    getAplicaciones,
    getAplicacionById,
    createAplicacion,
    updateAplicacion,
    deleteAplicacion,
    getAplicacionByCode,
};
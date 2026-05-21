/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const GaleriasService = require("../services/galerias.service");
const service = new GaleriasService();

const getGalerias = async (req, res = response) => {
    try {
        const galerias = await service.obtenerGalerias();
        res.status(200).json({ ok: true, galerias });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getGaleriaById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const galeria = await service.obtenerGaleriaPorId(id);
        res.status(200).json({ ok: true, galeria });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createGaleria = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const galeria = await service.crearGaleria({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, galeria });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateGaleria = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const galeria = await service.actualizarGaleria(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, galeria });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteGaleria = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.eliminarGaleria(id);
        res.status(200).json({ ok: true, msg: "Galería eliminada" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getGalerias,
    getGaleriaById,
    createGaleria,
    updateGaleria,
    deleteGaleria
};
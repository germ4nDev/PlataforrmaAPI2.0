/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const TipoGaleriaService = require("../services/tipos-galeria.service");
const service = new TipoGaleriaService();

const getTiposGaleria = async (req, res = response) => {
    try {
        const tiposGaleria = await service.getTiposGaleria();
        res.status(200).json({ ok: true, tiposGaleria });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getTipoGaleriaById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const tipoGaleria = await service.getTipoGaleriaById(id);
        res.status(200).json({ ok: true, tipoGaleria });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createTipoGaleria = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const tipoGaleria = await service.createTipoGaleria({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, tipoGaleria });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateTipoGaleria = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const tipoGaleria = await service.updateTipoGaleria(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, tipoGaleria });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteTipoGaleria = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.deleteTipoGaleria(id);
        res.status(200).json({ ok: true, msg: "Tipo de galería eliminado correctamente" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getTiposGaleria,
    getTipoGaleriaById,
    createTipoGaleria,
    updateTipoGaleria,
    deleteTipoGaleria
};
/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const FormatoGaleriaService = require("../services/formatos-galeria.service");
const service = new FormatoGaleriaService();

const getFormatosGaleria = async (req, res = response) => {
    try {
        const formatosGaleria = await service.obtenerFormatosGaleria();
        res.status(200).json({ ok: true, formatosGaleria });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getFormatoGaleriaById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const formatoGaleria = await service.obtenerFormatoGaleriaPorId(id);
        res.status(200).json({ ok: true, formatoGaleria });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createFormatoGaleria = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const formatoGaleria = await service.crearFormatoGaleria({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, formatoGaleria });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateFormatoGaleria = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const formatoGaleria = await service.actualizarFormatoGaleria(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, formatoGaleria });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteFormatoGaleria = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.eliminarFormatoGaleria(id);
        res.status(200).json({ ok: true, msg: "Formato eliminado correctamente" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getFormatosGaleria,
    getFormatoGaleriaById,
    createFormatoGaleria,
    updateFormatoGaleria,
    deleteFormatoGaleria
};
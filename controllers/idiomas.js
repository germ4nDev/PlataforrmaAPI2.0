/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const IdiomaService = require("../services/idiomas.service");
const service = new IdiomaService();

const getIdiomas = async (req, res = response) => {
    try {
        const idiomas = await service.getIdiomas();
        res.status(200).json({ ok: true, idiomas });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getIdiomaById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const idioma = await service.getIdiomaById(id);
        res.status(200).json({ ok: true, idioma });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createIdioma = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const idioma = await service.createIdioma({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, idioma });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateIdioma = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const idioma = await service.updateIdioma(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, idioma });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteIdioma = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.deleteIdioma(id);
        res.status(200).json({ ok: true, msg: "Idioma eliminado" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getIdiomas,
    getIdiomaById,
    createIdioma,
    updateIdioma,
    deleteIdioma
};
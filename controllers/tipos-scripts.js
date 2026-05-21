/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const TipoScriptService = require("../services/tipos-scripts.service");
const service = new TipoScriptService();

const getTiposScripts = async (req, res = response) => {
    try {
        const tiposScripts = await service.getTiposScripts();
        res.status(200).json({ ok: true, tiposScripts });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getTipoScriptById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const tipoScript = await service.getTipoScriptById(id);
        res.status(200).json({ ok: true, tipoScript });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createTipoScript = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const tipoScript = await service.createTipoScript({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, tipoScript });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateTipoScript = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const tipoScript = await service.updateTipoScript(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, tipoScript });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteTipoScript = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.deleteTipoScript(id);
        res.status(200).json({ ok: true, msg: "Tipo de script eliminado correctamente" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getTiposScripts,
    getTipoScriptById,
    createTipoScript,
    updateTipoScript,
    deleteTipoScript
};
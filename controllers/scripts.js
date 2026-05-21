/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ScriptsService = require("../services/scripts.service");
const service = new ScriptsService();

const getScripts = async (req, res = response) => {
    try {
        const respuesta = await service.getScripts();
        res.status(200).json({ ok: true, respuesta });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getScriptById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const respuesta = await service.getScriptById(id);
        res.status(200).json({ ok: true, respuesta });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createScript = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const respuesta = await service.createScript({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, respuesta });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateScript = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const respuesta = await service.updateScript(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, respuesta });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteScript = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.deleteScript(id);
        res.status(200).json({ ok: true, msg: "Script eliminado correctamente" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getScripts,
    getScriptById,
    createScript,
    updateScript,
    deleteScript
};
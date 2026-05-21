/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ModulosAPService = require("../services/modulos-ap.service");
const service = new ModulosAPService();

const getModulos = async (req, res = response) => {
    try {
        const modulos = await service.getModulos();
        res.status(200).json({ ok: true, modulos });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getModuloById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const modulo = await service.getModuloById(id);
        res.status(200).json({ ok: true, modulo });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createModulo = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const modulo = await service.createModulo({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, modulo });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateModulo = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const modulo = await service.updateModulo(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, modulo });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteModulo = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.deleteModulo(id);
        res.status(200).json({ ok: true, msg: "Módulo eliminado correctamente" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getModulos,
    getModuloById,
    createModulo,
    updateModulo,
    deleteModulo
};
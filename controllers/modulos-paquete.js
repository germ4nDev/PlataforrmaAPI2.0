/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ModuloPaqueteService = require("../services/modulos-paquete.service");
const service = new ModuloPaqueteService();

const getModulosPaquete = async (req, res = response) => {
    try {
        const modulosPaquete = await service.getModulosPaquete();
        res.status(200).json({ ok: true, modulosPaquete });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getModulosPaqueteById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const moduloPaquete = await service.getModulosPaqueteById(id);
        res.status(200).json({ ok: true, moduloPaquete });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const getModulosPaqueteByCode = async (req, res = response) => {
    try {
        const { codigoPaquete } = req.params;
        const modulosPaquete = await service.getModulosPaqueteByCode(codigoPaquete);
        res.status(200).json({ ok: true, modulosPaquete });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createModulosPaquete = async (req, res = response) => {
    try {
        const moduloPaquete = await service.createModulosPaquete(req.body);
        res.status(201).json({ ok: true, moduloPaquete });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateModulosPaquete = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const moduloPaquete = await service.updateModulosPaquete(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, moduloPaquete });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteModulosPaquete = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.deleteModulosPaquete(id);
        res.status(200).json({ ok: true, msg: "Módulo de paquete eliminado" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getModulosPaquete,
    getModulosPaqueteById,
    getModulosPaqueteByCode,
    createModulosPaquete,
    updateModulosPaquete,
    deleteModulosPaquete
};
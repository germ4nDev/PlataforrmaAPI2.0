/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const PaqueteService = require("../services/paquetes.service");
const service = new PaqueteService();

const getPaquetes = async (req, res = response) => {
    try {
        const paquetes = await service.getPaquetes();
        res.status(200).json({ ok: true, paquetes });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getPaqueteById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const paquete = await service.getPaqueteById(id);
        res.status(200).json({ ok: true, paquete });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createPaquete = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const paquete = await service.createPaquete({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, paquete });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updatePaquete = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const paquete = await service.updatePaquete(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, paquete });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deletePaquete = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.deletePaquete(id);
        res.status(200).json({ ok: true, msg: "Paquete eliminado correctamente" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getPaquetes,
    getPaqueteById,
    createPaquete,
    updatePaquete,
    deletePaquete
};
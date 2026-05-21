/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const ItemPaqueteService = require("../services/items-paquete.service");
const service = new ItemPaqueteService();

const getItemsPaquete = async (req, res = response) => {
    try {
        const itemsPaquete = await service.obtenerItemsPaquete();
        res.status(200).json({ ok: true, itemsPaquete });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getItemsByPaqueteCode = async (req, res = response) => {
    try {
        const { codigoPaquete } = req.params;
        const itemsPaquete = await service.obtenerItemsPaquetePorCodigoPaquete(codigoPaquete);
        res.status(200).json({ ok: true, itemsPaquete });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const getItemPaqueteById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const itemPaquete = await service.obtenerItemPaquetePorId(id);
        res.status(200).json({ ok: true, itemPaquete });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createItemPaquete = async (req, res = response) => {
    try {
        const usuarioAccion = req.usuario?.codigoUsuario;
        const itemPaquete = await service.crearItemPaquete({ ...req.body, usuarioAccion });
        res.status(201).json({ ok: true, itemPaquete });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateItemPaquete = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioAccion = req.usuario?.codigoUsuario;
        const itemPaquete = await service.actualizarItemPaquete(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, itemPaquete });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteItemPaquete = async (req, res = response) => {
    try {
        const { id } = req.params;
        await service.eliminarItemPaquete(id);
        res.status(200).json({ ok: true, msg: "Item de paquete eliminado" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getItemsPaquete,
    getItemPaqueteById,
    getItemsByPaqueteCode,
    createItemPaquete,
    updateItemPaquete,
    deleteItemPaquete
};
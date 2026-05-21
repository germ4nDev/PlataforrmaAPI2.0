/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const UsuarioSCService = require("../services/usuarios-sc.service");
const service = new UsuarioSCService();

const getUsuariosSC = async (req, res = response) => {
    try {
        const usuariosSC = await service.getUsuariosSC();
        res.status(200).json({ ok: true, usuariosSC });
    } catch (error) {
        res.status(error.statusCode || 500).json({ ok: false, msg: error.msg });
    }
};

const getUsuarioSCById = async (req, res = response) => {
    try {
        const { id } = req.params; // codigoUsuarioSC
        const usuarioSC = await service.getUsuarioSCById(id);
        res.status(200).json({ ok: true, usuarioSC });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const getUsuariosSCBySuscriptorCode = async (req, res = response) => {
    try {
        const { codigoSuscriptor } = req.params;
        const usuariosSC = await service.getUsuariosSCBySuscriptorCode(codigoSuscriptor);
        res.status(200).json({ ok: true, usuariosSC });
    } catch (error) {
        res.status(error.statusCode || 404).json({ ok: false, msg: error.msg });
    }
};

const createUsuarioSC = async (req, res = response) => {
    try {
        const usuarioSC = await service.createUsuarioSC(req.body);
        res.status(201).json({ ok: true, usuarioSC });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const updateUsuarioSC = async (req, res = response) => {
    try {
        const { id } = req.params; // codigoUsuarioSC
        const usuarioAccion = req.usuario?.codigoUsuario;
        const usuarioSC = await service.updateUsuarioSC(id, req.body, usuarioAccion);
        res.status(200).json({ ok: true, usuarioSC });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

const deleteUsuarioSC = async (req, res = response) => {
    try {
        const { id } = req.params; // codigoUsuarioSC
        await service.deleteUsuarioSC(id);
        res.status(200).json({ ok: true, msg: "Usuario Suscriptor eliminado correctamente" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ ok: false, msg: error.msg });
    }
};

module.exports = {
    getUsuariosSC,
    getUsuarioSCById,
    getUsuariosSCBySuscriptorCode,
    createUsuarioSC,
    updateUsuarioSC,
    deleteUsuarioSC
};
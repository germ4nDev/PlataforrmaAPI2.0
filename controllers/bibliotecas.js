/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require("express");
const BibliotecasService = require("../services/bibliotecas.service");
const service = new BibliotecasService();

const getBibliotecas = async (req, res = response) => {
    try {
        const bibliotecas = await service.getBibliotecas();
        return res.status(200).json({
            ok: true,
            bibliotecas,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "Error al get bibliotecas" });
    }
};

const getBibliotecaByCode = async (req, res = response) => {
    try {
        const biblioteca = await service.getBibliotecaByCode(req.params.id);

        if (!biblioteca) {
            return res.status(404).json({ ok: false, msg: "No existe una biblioteca por el id" });
        }

        return res.status(200).json({
            ok: true,
            biblioteca,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "Error al get biblioteca" });
    }
};

const createBiblioteca = async (req, res = response) => {
    try {
        const bibliotecaDB = await service.createBiblioteca(req.body);

        return res.status(201).json({
            ok: true,
            biblioteca: bibliotecaDB
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({ ok: false, error: 'Error al create la biblioteca' });
    }
};

const updateBiblioteca = async (req, res = response) => {
    try {
        const { codigoBiblioteca, ...data } = req.body;
        const usuarioId = req.usuario?.id;

        const bibliotecaActualizada = await service.updateBiblioteca(codigoBiblioteca, data, usuarioId);

        return res.status(200).json({
            ok: true,
            biblioteca: bibliotecaActualizada
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({ ok: false, error: 'Error al update la biblioteca' });
    }
};

const deleteBiblioteca = async (req, res = response) => {
    try {
        const bibliotecaEliminada = await service.deleteBiblioteca(req.params.id);

        return res.status(200).json({
            ok: true,
            biblioteca: bibliotecaEliminada,
            msg: 'Aplicación eliminada correctamente'
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({ ok: false, error: 'Error al delete la biblioteca' });
    }
};

module.exports = {
    getBibliotecas,
    getBibliotecaByCode,
    createBiblioteca,
    updateBiblioteca,
    deleteBiblioteca,
};
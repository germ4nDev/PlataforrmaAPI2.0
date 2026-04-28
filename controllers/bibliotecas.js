/*
    Author: German Valencia
    Actualización: Juan Camilo Valencia
*/
const express = require("express");
const path = require("path");
const sequelize = require("../database/connection");
const PTLBiblioteca = require("../models/biblioteca")(sequelize);
const { io } = require("../index");

const getBiblioteca = async(req, res) => {
    try {
        const bibliotecas = await PTLBiblioteca.findAll();
        console.log('bibliotecas', bibliotecas);
        return res.status(201).json({
            ok: true,
            bibliotecas: bibliotecas,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener la Bibliotecas" });
    }
};

const getBibliotecaById = async(req, res) => {
    try {
        const codigoBiblioteca = req.params.id;
        const biblioteca = await PTLBiblioteca.findOne({
            where: {
                codigoBiblioteca: codigoBiblioteca,
            },
        });
        if (!biblioteca) {
            return res.status(404).json({
                ok: false,
                msg: "No existe una biblioteca por ese id",
            });
        }
        return res.status(201).json({
            ok: true,
            biblioteca: biblioteca,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener la biblioteca" });
    }
};

const createBiblioteca = async(req, res = response) => {
    const {...data } = req.body;
    console.log('data biblioteca', data);
    try {
        const existente = await PTLBiblioteca.findOne({
            where: { codigoAplicacion: data.codigoAplicacion }
        });
        console.log('existente', existente);
        if (existente) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una biblioteca para esa aplicacion'
            });
        }
        const existeNombre = await PTLBiblioteca.findOne({
            where: { nombreBiblioteca: data.nombreBiblioteca }
        });
        console.log('existeNombre', existeNombre);
        if (existeNombre) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una biblioteca con ese nombre'
            });
        }
        const nuevo = await PTLBiblioteca.create(data);
        console.log('nuevo', nuevo);
        io.emit('bibliotecas-actualizados', {
            action: 'create',
            msg: `biblioteca creado: ${nuevo.nombreBiblioteca}`
        });
        return res.status(201).json({
            ok: true,
            biblioteca: nuevo,
        });
    } catch (error) {
        // 1. ESTO ES LO QUE TÚ VERÁS EN LA CONSOLA DEL SERVIDOR
        console.error('Error al crear biblioteca en la BD:', error);

        // 2. ESTO ES LO QUE LE MANDAS A ANGULAR (Nunca un error 500 a secas)
        res.status(500).json({
            ok: false,
            msg: 'Error interno: Revise los logs del servidor',
            detalle: error.message // Opcional: solo en desarrollo para ver qué pasó
        });
    }
};

const updateBiblioteca = async(req, res = response) => {
    try {
        const { codigoBiblioteca, ...data } = req.body;
        const bibliotecaDB = await PTLBiblioteca.findOne({
            where: { codigoBiblioteca },
        });
        if (!bibliotecaDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe una biblioteca con ese ID",
            });
        }

        await PTLBiblioteca.update(data, {
            where: { codigoBiblioteca },
        });
        const bibliotecaActualizado = await PTLBiblioteca.findOne({
            where: { codigoBiblioteca },
        });
        io.emit("bibliotecas-actualizadas", {
            action: "update",
            msg: `Biblioteca actualizada: ${bibliotecaActualizado.nombreBiblioteca}`,
        });
        return res.status(200).json({
            ok: true,
            biblioteca: bibliotecaActualizado,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: "Error al actualizar la biblioteca",
        });
    }
};

const deleteBiblioteca = async(req, res = response) => {
    try {
        const codigoBiblioteca = req.params.id;
        const bibliotecaDB = await PTLBiblioteca.findOne({
            where: { codigoBiblioteca },
        });
        if (!bibliotecaDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un biblioteca con ese ID",
            });
        }
        bibliotecaEliminado = await PTLBiblioteca.destroy({
            where: { codigoBiblioteca },
        });
        io.emit("bibliotecas-actualizadas", {
            action: "delete",
            msg: `Biblioteca eliminada correctamente`,
        });
        return res.status(200).json({
            ok: true,
            biblioteca: bibliotecaEliminado,
            msg: "la biblioteca se elimino correctamente",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: "Error al eliminar la biblioteca",
        });
    }
};

module.exports = {
    getBiblioteca,
    getBibliotecaById,
    createBiblioteca,
    updateBiblioteca,
    deleteBiblioteca,
};
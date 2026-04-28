/*
    Author: German Valencia
    Actualizado: German Valiencia 20251026
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuariosSC = require('../models/usuario-sc')(sequelize);
const { io } = require('../index');

const getUsuariosSC = async(req, res) => {
    try {
        const usuariosSC = await PTLUsuariosSC.findAll();
        return res.status(201).json({
            ok: true,
            usuariosSC: usuariosSC,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener Usuarios' });
    }
};

const getUsuariosSCById = async(req, res) => {
    try {
        const codigoUsuarioSC = req.params.id;
        const usuarioSC = await PTLUsuariosSC.findById(codigoUsuarioSC);
        if (!usuarioSC) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id",
            });
        }
        return res.status(201).json({
            ok: true,
            usuarioSC: usuarioSC,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const getUsuariosSCByCodigo = async(req, res) => {
    try {
        const codigoSusucirptor = req.params.id;
        const usuarioSC = await PTLUsuariosSC.findAll({
            where: {
                codigoSusucirptor: codigoSusucirptor
            },
        });
        if (!usuarioSC) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id",
            });
        }
        return res.status(201).json({
            ok: true,
            usuariosSC: usuariosSC,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const createUsuarioSC = async(req, res = response) => {
    const {...newRegistro } = req.body;
    try {
        const nuevo = await PTLUsuariosSC.create(newRegistro);
        io.emit("usuarios-sc-actualizados", {
            action: "create",
            msg: `Usuario Suscriptor creado: ${nuevo.codigoUsuarioSC}`,
        });
        return res.status(201).json({
            ok: true,
            usuarioSC: nuevo,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el usuarioSC' });
    }
};

const updateUsuarioSC = async(req, res = response) => {
    const { codigoUsuarioSC, ...data } = req.body;
    try {
        const usuarioSCDB = await PTLUsuariosSC.findOne({
            where: { codigoUsuarioSC },
        });
        if (!usuarioSCDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese codigo",
            });
        }
        await PTLUsuariosSC.update(data, {
            where: { codigoUsuarioSC },
        });
        const usuarioSCActualizado = await PTLUsuariosSC.findOne({
            where: { codigoUsuarioSC },
        });
        io.emit('usuarios-empresas-actualizados', {
            action: 'update',
            msg: `Usuario Suscriptor actualizado: ${usuarioSCActualizado.codigoUsuarioSC}`
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

const deleteUsuarioSC = async(req, res = response) => {
    try {
        const codigoUsuarioSC = req.params.id;
        const usuarioSCDB = await PTLUsuariosSC.findOne({
            where: { codigoUsuarioSC },
        });
        if (!usuarioSCDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuarioSC con ese ID",
            });
        }
        const usuarioSCEliminado = await PTLUsuariosSC.destroy({
            where: { codigoUsuarioSC },
        });
        io.emit('usuarios-empresas-actualizados', {
            action: 'delete',
            msg: `Usuario Suscriptor eliminado: ${usuarioSCEliminado.codigoUsuarioSC}`
        });
        return res.status(200).json({
            ok: true,
            usuarioSC: usuarioSCEliminado,
            msg: "usuarioSC eliminado correctamente",
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

module.exports = {
    getUsuariosSC,
    getUsuariosSCById,
    getUsuariosSCByCodigo,
    createUsuarioSC,
    updateUsuarioSC,
    deleteUsuarioSC,
};
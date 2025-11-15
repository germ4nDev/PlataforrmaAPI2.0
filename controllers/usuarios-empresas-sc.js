/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLUsuariosEmpresasSC = require('../models/usuario-empresa-sc')(sequelize);

const getUsuariosEmpresas = async (req, res) => {
    try {
        const usuariosEmpresas = await PTLUsuariosEmpresasSC.findAll();
        return res.status(201).json({
            ok: true,
            usuariosEmpresas: usuariosEmpresas
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener usuariosEmpresas' });
    }
};

const getUsuariosEmpresasById = async (req, res) => {
    try {
        const codigoUsuarioEmpresaSC = req.params.id;
        const usuarioEmpresa = await PTLUsuariosEmpresasSC.findOne({
            where: {
                codigoUsuarioEmpresaSC: codigoUsuarioEmpresaSC,
            },
        });
        if (!usuarioEmpresa) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuarioEmpresa por ese id",
            });
        }
        return res.status(201).json({
            ok: true,
            usuarioEmpresa: usuarioEmpresa,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuarioEmpresa" });
    }
};

const createUsuarioEmpresa = async (req, res = response) => {
    const { ...data } = req.body;
    try {
        const nuevo = await PTLUsuariosEmpresasSC.create(data);
        return res.status(201).json({
            ok: true,
            usuarioEmpresa: nuevo,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al crear el usuarioEmpresa" });
    }
};

const updateUsuarioEmpresa = async (req, res = response) => {
    const { codigoUsuarioEmpresaSC, ...data } = req.body;
    try {
        const usuarioEmpresaDB = await PTLUsuariosEmpresasSC.findOne({
            where: { codigoUsuarioEmpresaSC }
        });
        if (!usuarioEmpresaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuarioEmpresa con ese ID'
            });
        }
        await PTLUsuariosEmpresasSC.update(data, {
            where: { codigoUsuarioEmpresaSC }
        });
        const usuarioEmpresaActualizado = await PTLUsuariosEmpresasSC.findOne({
            where: { codigoUsuarioEmpresaSC },
        });
        return res.status(201).json({
            ok: true,
            usuarioEmpresa: usuarioEmpresaActualizado,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: 'Error al actualizar el usuarioEmpresa'
        });
    }
};

const deleteUsuarioEmpresa = async (req, res = response) => {
    try {
        const codigoUsuarioEmpresaSC = req.params.id;
        const usuarioEmpresaDB = await PTLUsuariosEmpresasSC.findOne({
            where: { codigoUsuarioEmpresaSC }
        });
        if (!usuarioEmpresaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuarioEmpresa con ese ID'
            });
        }
        const usuarioEmpresaEliminado = await PTLUsuariosEmpresasSC.destroy({
            where: { codigoUsuarioEmpresaSC }
        });

        return res.status(200).json({
            ok: true,
            usuarioEmpresa: usuarioEmpresaEliminado,
            msg: 'usuarioEmpresa eliminado correctamente'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: 'Error al eliminar el usuarioEmpresa'
        });
    }
};

module.exports = {
    getUsuariosEmpresas,
    getUsuariosEmpresasById,
    createUsuarioEmpresa,
    updateUsuarioEmpresa,
    deleteUsuarioEmpresa,
};

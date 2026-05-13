// /*
//     Author: German Valencia
//     Actualizado: German Valiencia 20251026
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLUsuariosSC = require('../models/usuario-sc')(sequelize);
// const { io } = require('../index');

// const getUsuariosSC = async(req, res) => {
//     try {
//         const usuariosSC = await PTLUsuariosSC.findAll();
//         return res.status(201).json({
//             ok: true,
//             usuariosSC: usuariosSC,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al obtener Usuarios' });
//     }
// };

// const getUsuariosSCById = async(req, res) => {
//     try {
//         const codigoUsuarioSC = req.params.id;
//         const usuarioSC = await PTLUsuariosSC.findById(codigoUsuarioSC);
//         if (!usuarioSC) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un usuario por ese id",
//             });
//         }
//         return res.status(201).json({
//             ok: true,
//             usuarioSC: usuarioSC,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al obtener el usuario' });
//     }
// };

// const getUsuariosSCByCodigo = async(req, res) => {
//     try {
//         const codigoSusucirptor = req.params.id;
//         const usuarioSC = await PTLUsuariosSC.findAll({
//             where: {
//                 codigoSusucirptor: codigoSusucirptor
//             },
//         });
//         if (!usuarioSC) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un usuario por ese id",
//             });
//         }
//         return res.status(201).json({
//             ok: true,
//             usuariosSC: usuariosSC,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al obtener el usuario' });
//     }
// };

// const createUsuarioSC = async(req, res = response) => {
//     const {...newRegistro } = req.body;
//     try {
//         const nuevo = await PTLUsuariosSC.create(newRegistro);
//         io.emit("usuarios-sc-actualizados", {
//             action: "create",
//             msg: `Usuario Suscriptor creado: ${nuevo.codigoUsuarioSC}`,
//         });
//         return res.status(201).json({
//             ok: true,
//             usuarioSC: nuevo,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al crear el usuarioSC' });
//     }
// };

// const updateUsuarioSC = async(req, res = response) => {
//     const { codigoUsuarioSC, ...data } = req.body;
//     try {
//         const usuarioSCDB = await PTLUsuariosSC.findOne({
//             where: { codigoUsuarioSC },
//         });
//         if (!usuarioSCDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un usuario por ese codigo",
//             });
//         }
//         await PTLUsuariosSC.update(data, {
//             where: { codigoUsuarioSC },
//         });
//         const usuarioSCActualizado = await PTLUsuariosSC.findOne({
//             where: { codigoUsuarioSC },
//         });
//         io.emit('usuarios-empresas-actualizados', {
//             action: 'update',
//             msg: `Usuario Suscriptor actualizado: ${usuarioSCActualizado.codigoUsuarioSC}`
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al actualizar el usuario' });
//     }
// };

// const deleteUsuarioSC = async(req, res = response) => {
//     try {
//         const codigoUsuarioSC = req.params.id;
//         const usuarioSCDB = await PTLUsuariosSC.findOne({
//             where: { codigoUsuarioSC },
//         });
//         if (!usuarioSCDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un usuarioSC con ese ID",
//             });
//         }
//         const usuarioSCEliminado = await PTLUsuariosSC.destroy({
//             where: { codigoUsuarioSC },
//         });
//         io.emit('usuarios-empresas-actualizados', {
//             action: 'delete',
//             msg: `Usuario Suscriptor eliminado: ${usuarioSCEliminado.codigoUsuarioSC}`
//         });
//         return res.status(200).json({
//             ok: true,
//             usuarioSC: usuarioSCEliminado,
//             msg: "usuarioSC eliminado correctamente",
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al eliminar usuario' });
//     }
// };

// module.exports = {
//     getUsuariosSC,
//     getUsuariosSCById,
//     getUsuariosSCByCodigo,
//     createUsuarioSC,
//     updateUsuarioSC,
//     deleteUsuarioSC,
// };

/*
    Author: German Valencia
    Actualizado: German Valencia 20251026
*/
const { response } = require('express');
const usuariosScService = require('../services/usuarios-sc.service'); // Ajusta la ruta a tu proyecto

const getUsuariosSC = async (req, res = response) => {
    try {
        const usuariosSC = await usuariosScService.obtenerUsuariosSC();

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            usuariosSC: usuariosSC,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener Usuarios' });
    }
};

const getUsuariosSCById = async (req, res = response) => {
    try {
        const usuarioSC = await usuariosScService.obtenerUsuarioSCPorId(req.params.id);

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            usuarioSC: usuarioSC,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const getUsuariosSCByCodigo = async (req, res = response) => {
    try {
        const usuariosSC = await usuariosScService.obtenerUsuariosSCPorCodigoSuscriptor(req.params.id);

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            usuariosSC: usuariosSC, // Corregido ReferenceError
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

const createUsuarioSC = async (req, res = response) => {
    try {
        const nuevoUsuarioSC = await usuariosScService.crearUsuarioSC(req.body);

        return res.status(201).json({
            ok: true,
            usuarioSC: nuevoUsuarioSC,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el usuarioSC' });
    }
};

const updateUsuarioSC = async (req, res = response) => {
    try {
        const { codigoUsuarioSC, ...data } = req.body;

        const usuarioSCActualizado = await usuariosScService.actualizarUsuarioSC(codigoUsuarioSC, data);

        // Corregido: ¡Faltaba enviar la respuesta al cliente!
        return res.status(200).json({
            ok: true,
            usuarioSC: usuarioSCActualizado
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

const deleteUsuarioSC = async (req, res = response) => {
    try {
        const usuarioSCEliminado = await usuariosScService.eliminarUsuarioSC(req.params.id);

        return res.status(200).json({
            ok: true,
            usuarioSC: usuarioSCEliminado,
            msg: "usuarioSC eliminado correctamente",
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
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
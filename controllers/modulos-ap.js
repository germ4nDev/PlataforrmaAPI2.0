// /*
//     Author: German Valencia
// */
// const express = require("express");
// const sequelize = require("../database/connection");
// const PTModulosAP = require("../models/modulo-ap")(sequelize);
// const { io } = require('../index');

// const getModulos = async(req, res) => {
//     try {
//         const modulos = await PTModulosAP.findAll();
//         return res.status(201).json({
//             ok: true,
//             modulos: modulos,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al obtener Modulos" });
//     }
// };

// const getModuloById = async(req, res) => {
//     try {
//         const codigoModulo = req.params.id;
//         const modulo = await PTModulosAP.findOne({
//             where: { codigoModulo },
//         });
//         console.log("modulo", modulo);
//         if (!modulo) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un modulo por ese id",
//             });
//         }
//         return res.status(201).json({
//             ok: true,
//             modulo: modulo,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al obtener modulo" });
//     }
// };

// const createModulo = async(req, res = response) => {
//     const {...data } = req.body;
//     try {
//         const existente = await PTModulosAP.findOne({
//             where: { codigoModulo: data.codigoModulo }
//         });
//         const existeNombre = await PTModulosAP.findOne({
//             where: { nombreModulo: data.nombreModulo }
//         });
//         if (existente) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'Ya existe una modulo con ese código'
//             });
//         }
//         if (existeNombre) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'Ya existe una modulo con ese nombre'
//             });
//         }
//         const nuevo = await PTModulosAP.create(data);
//         io.emit('modulos-actualizados', {
//             action: 'create',
//             msg: `Modulo creado: ${nuevo.nombreModulo}`
//         });
//         return res.status(201).json({
//             ok: true,
//             modulo: nuevo,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al crear el modulo" });
//     }
// };

// const updateModulo = async(req, res = response) => {
//     const { codigoModulo, ...data } = req.body;
//     try {
//         const moduloOg = await PTModulosAP.findOne({
//             where: { codigoModulo },
//         });
//         if (!moduloOg) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un modulo por ese id",
//             });
//         }
//         await PTModulosAP.update(data, {
//             where: { codigoModulo },
//         });
//         const moduloActualizado = await PTModulosAP.findOne({
//             where: { codigoModulo },
//         });
//         io.emit('modulos-actualizados', {
//             action: 'update',
//             msg: `Modulo actualozado: ${moduloActualizado.nombreModulo}`
//         });
//         return res.status(201).json({
//             ok: true,
//             modulo: moduloActualizado,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al actualizar el modulo" });
//     }
// };

// const deleteModulo = async(req, res = response) => {
//     try {
//         const codigoModulo = req.params.id;
//         const modulo = await PTModulosAP.findOne({
//             where: { codigoModulo },
//         });
//         if (!modulo) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un modulo por ese id",
//             });
//         }
//         const moduloEliminado = await PTModulosAP.destroy({
//             where: { codigoModulo },
//         });
//         io.emit('modulos-actualizados', {
//             action: 'delete',
//             msg: `Modulo eliminado: ${modulo.nombreModulo}`
//         });
//         return res.status(201).json({
//             ok: true,
//             modulo: moduloEliminado,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al eliminar modulo" });
//     }
// };

// module.exports = {
//     getModulos,
//     getModuloById,
//     createModulo,
//     updateModulo,
//     deleteModulo,
// };

/*
    Author: German Valencia
*/
const { response } = require("express");
const modulosApService = require("../services/modulos-ap.service"); // Ajusta la ruta a tu proyecto

const getModulos = async (req, res = response) => {
    try {
        const modulos = await modulosApService.obtenerModulos();

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            modulos: modulos,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener Modulos" });
    }
};

const getModuloById = async (req, res = response) => {
    try {
        const modulo = await modulosApService.obtenerModuloPorId(req.params.id);

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            modulo: modulo,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al obtener modulo" });
    }
};

const createModulo = async (req, res = response) => {
    try {
        const nuevoModulo = await modulosApService.crearModulo(req.body);

        return res.status(201).json({
            ok: true,
            modulo: nuevoModulo,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al crear el modulo" });
    }
};

const updateModulo = async (req, res = response) => {
    try {
        const { codigoModulo, ...data } = req.body;

        const moduloActualizado = await modulosApService.actualizarModulo(codigoModulo, data);

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            modulo: moduloActualizado,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al actualizar el modulo" });
    }
};

const deleteModulo = async (req, res = response) => {
    try {
        const moduloEliminado = await modulosApService.eliminarModulo(req.params.id);

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            modulo: moduloEliminado,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al eliminar modulo" });
    }
};

module.exports = {
    getModulos,
    getModuloById,
    createModulo,
    updateModulo,
    deleteModulo,
};
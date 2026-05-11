// /*
//     Author: German Valencia
//     Actualización: Juan Camilo Valencia
// */
// const express = require("express");
// const path = require("path");
// const sequelize = require("../database/connection");
// const PTLGaleria = require("../models/galeria")(sequelize);
// const { io } = require("../index");

// const getGalerias = async(req, res) => {
//     try {
//         const galerias = await PTLGaleria.findAll();
//         return res.status(201).json({
//             ok: true,
//             galerias: galerias,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al obtener las Galerías" });
//     }
// };

// const getGaleriaById = async(req, res) => {
//     try {
//         const codigoGaleria = req.params.id;
//         const galeria = await PTLGaleria.findOne({
//             where: {
//                 codigoGaleria: codigoGaleria,
//             },
//         });
//         if (!galeria) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe una galería con ese id",
//             });
//         }
//         return res.status(201).json({
//             ok: true,
//             galeria: galeria,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al obtener la galería" });
//     }
// };

// const createGaleria = async(req, res = response) => {
//     const {...nuevaGaleria } = req.body;
//     try {
//         console.log('data galeria', nuevaGaleria);
//         // const existeSigla = await PTLIdiomas.findOne({
//         //     where: { siglaIdioma: data.siglaIdioma }
//         // });
//         // if (existeSigla) {
//         //     return res.status(400).json({
//         //         ok: false,
//         //         msg: `La sigla ${data.siglaIdioma} ya está registrado`
//         //     });
//         // }
//         const nuevo = await PTLGaleria.create(nuevaGaleria);
//         console.log('galeria creado', nuevo);
//         if (typeof io !== 'undefined') {
//             io.emit('galerias-actualizados', {
//                 action: 'create',
//                 msg: `Galeria creado: ${nuevo.nombreIdioma}`
//             });
//         } else {
//             console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
//         }
//         return res.status(201).json({
//             ok: true,
//             idioma: nuevo,
//         });
//     } catch (err) {
//         // 5. CRÍTICO: Imprime el error real en la consola de Node para debuguear
//         console.error('--- ERROR EN CREATE PAQUETE ---');
//         console.error(err);

//         // Si el error es de Sequelize (base de datos)
//         if (err.name === 'SequelizeValidationError') {
//             return res.status(400).json({
//                 ok: false,
//                 error: "Faltan campos obligatorios",
//                 detalles: err.errors.map(e => e.message)
//             });
//         }

//         res.status(500).json({
//             ok: false,
//             error: "Error interno en el servidor",
//             msg: err.message // Esto te ayudará a ver el error en Postman/Frontend
//         });
//     }
// };

// const updateGaleria = async(req, res = response) => {
//     try {
//         const { codigoGaleria, ...data } = req.body;
//         const galeriaDB = await PTLGaleria.findOne({
//             where: { codigoGaleria },
//         });
//         if (!galeriaDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe una galería con ese ID",
//             });
//         }
//         await PTLGaleria.update(data, {
//             where: { codigoGaleria },
//         });
//         const galeriaActualizada = await PTLGaleria.findOne({
//             where: { codigoGaleria },
//         });
//         io.emit("galerias-actualizadas", {
//             action: "update",
//             msg: `Galería actualizada: ${galeriaActualizada.nombreGaleria}`,
//         });
//         return res.status(200).json({
//             ok: true,
//             galeria: galeriaActualizada,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al actualizar la galería",
//         });
//     }
// };

// const deleteGaleria = async(req, res = response) => {
//     try {
//         const codigoGaleria = req.params.id;
//         const galeriaDB = await PTLGaleria.findOne({
//             where: { codigoGaleria },
//         });
//         if (!galeriaDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe una galería con ese ID",
//             });
//         }
//         const galeriaEliminada = await PTLGaleria.destroy({
//             where: { codigoGaleria },
//         });
//         io.emit("galerias-actualizadas", {
//             action: "delete",
//             msg: `Galería eliminada correctamente`,
//         });
//         return res.status(200).json({
//             ok: true,
//             galeria: galeriaEliminada,
//             msg: "La galería se eliminó correctamente",
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al eliminar la galería",
//         });
//     }
// };

// module.exports = {
//     getGalerias,
//     getGaleriaById,
//     createGaleria,
//     updateGaleria,
//     deleteGaleria,
// };

/*
    Author: German Valencia
    Actualización: Juan Camilo Valencia
*/
const { response } = require("express");
const galeriasService = require("../services/galerias.service"); // Ajusta la ruta a tu proyecto

const getGalerias = async (req, res = response) => {
    try {
        const galerias = await galeriasService.obtenerGalerias();

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            galerias: galerias,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener las Galerías" });
    }
};

const getGaleriaById = async (req, res = response) => {
    try {
        const galeria = await galeriasService.obtenerGaleriaPorId(req.params.id);

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            galeria: galeria,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al obtener la galería" });
    }
};

const createGaleria = async (req, res = response) => {
    try {
        const nuevaGaleriaDB = await galeriasService.crearGaleria(req.body);

        return res.status(201).json({
            ok: true,
            galeria: nuevaGaleriaDB, // Corregido: antes devolvía 'idioma'
        });
    } catch (err) {
        // Mantenemos tu excelente manejo de errores de Sequelize
        console.error('--- ERROR EN CREATE GALERIA ---'); // Corregido: antes decía PAQUETE
        console.error(err);

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                ok: false,
                error: "Faltan campos obligatorios",
                detalles: err.errors.map(e => e.message)
            });
        }

        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }

        res.status(500).json({
            ok: false,
            error: "Error interno en el servidor",
            msg: err.message
        });
    }
};

const updateGaleria = async (req, res = response) => {
    try {
        const { codigoGaleria, ...data } = req.body;

        const galeriaActualizada = await galeriasService.actualizarGaleria(codigoGaleria, data);

        return res.status(200).json({
            ok: true,
            galeria: galeriaActualizada,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al actualizar la galería",
        });
    }
};

const deleteGaleria = async (req, res = response) => {
    try {
        const galeriaEliminada = await galeriasService.eliminarGaleria(req.params.id);

        return res.status(200).json({
            ok: true,
            galeria: galeriaEliminada,
            msg: "La galería se eliminó correctamente",
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al eliminar la galería",
        });
    }
};

module.exports = {
    getGalerias,
    getGaleriaById,
    createGaleria,
    updateGaleria,
    deleteGaleria,
};
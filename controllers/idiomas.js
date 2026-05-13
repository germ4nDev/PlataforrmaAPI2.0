// /*
//     Author: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLIdiomas = require('../models/idioma')(sequelize);
// const { io } = require('../index');

// // Obtener todos los idioma
// const getIdiomas = async(req, res) => {
//     try {
//         const idiomas = await PTLIdiomas.findAll();
//         return res.status(201).json({
//             ok: true,
//             idiomas: idiomas,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al obtener idiomas' });
//     }
// };

// const getIdiomaById = async(req, res) => {
//     try {
//         const codigoIdioma = req.params.id;
//         console.log('codigoIdioma', codigoIdioma);
//         const idioma = await PTLIdiomas.findOne({
//             where: { codigoIdioma },
//         });
//         if (!idioma) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un idioma por ese codigo",
//             });
//         }
//         return res.status(201).json({
//             ok: true,
//             idioma: idioma,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al obtener idiomas' });
//     }
// };

// // Crear un idioma
// const createIdioma = async(req, res = response) => {
//     const {...data } = req.body;
//     try {
//         console.log('data idioma', data);
//         const existeSigla = await PTLIdiomas.findOne({
//             where: { siglaIdioma: data.siglaIdioma }
//         });
//         if (existeSigla) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: `La sigla ${data.siglaIdioma} ya está registrado`
//             });
//         }
//         const nuevo = await PTLIdiomas.create(data);
//         console.log('idioma creado', nuevo);
//         if (typeof io !== 'undefined') {
//             io.emit('idiomas-actualizados', {
//                 action: 'create',
//                 msg: `Idioma creado: ${nuevo.nombreIdioma}`
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

// // Actualizar un idioma
// const updateIdioma = async(req, res = response) => {
//     const codigoIdioma = req.params.id;
//     const {...data } = req.body;
//     console.log('codigoIdioma', codigoIdioma);
//     console.log('data Idioma', data);
//     try {
//         const IdiomaOg = await PTLIdiomas.findOne({
//             where: { codigoIdioma },
//         });
//         if (!IdiomaOg) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un Idioma por ese id",
//             });
//         }
//         await PTLIdiomas.update(data, {
//             where: { codigoIdioma },
//         });
//         const idiomaActualizado = await PTLIdiomas.findOne({
//             where: { codigoIdioma },
//         });
//         io.emit('idiomas-actualizados', {
//             action: 'update',
//             msg: `idioma actualozado: ${idiomaActualizado.nombreIdioma}`
//         });
//         return res.status(201).json({
//             ok: true,
//             idioma: idiomaActualizado,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al actualizar el Idioma" });
//     }
// };

// // Borrar un idioma
// const deleteIdioma = async(req, res = response) => {
//     try {
//         const codigoIdioma = req.params.id;
//         const Idioma = await PTLIdiomas.findOne({
//             where: { codigoIdioma },
//         });
//         if (!Idioma) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un idioma por ese id",
//             });
//         }
//         const IdiomaEliminado = await PTLIdiomas.destroy({
//             where: { codigoIdioma },
//         });
//         io.emit('idioma-actualizados', {
//             action: 'delete',
//             msg: `idioma eliminado: ${Idioma.nombreIdioma}`
//         });
//         return res.status(201).json({
//             ok: true,
//             idioma: IdiomaEliminado,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al eliminar idioma" });
//     }
// };

// module.exports = {
//     getIdiomas,
//     getIdiomaById,
//     createIdioma,
//     updateIdioma,
//     deleteIdioma,
// };

/*
    Author: German Valencia
*/
const { response } = require('express');
const idiomasService = require('../services/idiomas.service'); // Ajusta la ruta a tu proyecto

const getIdiomas = async (req, res = response) => {
    try {
        const idiomas = await idiomasService.obtenerIdiomas();

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            idiomas: idiomas,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener idiomas' });
    }
};

const getIdiomaById = async (req, res = response) => {
    try {
        const idioma = await idiomasService.obtenerIdiomaPorId(req.params.id);

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            idioma: idioma,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: 'Error al obtener idiomas' });
    }
};

const createIdioma = async (req, res = response) => {
    try {
        const nuevoIdioma = await idiomasService.crearIdioma(req.body);

        return res.status(201).json({
            ok: true,
            idioma: nuevoIdioma,
        });
    } catch (err) {
        console.error('--- ERROR EN CREATE IDIOMA ---'); // Corregido: antes decía PAQUETE
        console.error(err);

        // Excelente manejo del error de validación de Sequelize
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

const updateIdioma = async (req, res = response) => {
    try {
        // En este controlador específico estabas tomando el ID de los params
        const codigoIdioma = req.params.id;
        const { ...data } = req.body;

        const idiomaActualizado = await idiomasService.actualizarIdioma(codigoIdioma, data);

        return res.status(200).json({
            ok: true,
            idioma: idiomaActualizado,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al actualizar el Idioma" });
    }
};

const deleteIdioma = async (req, res = response) => {
    try {
        const idiomaEliminado = await idiomasService.eliminarIdioma(req.params.id);

        return res.status(200).json({
            ok: true,
            idioma: idiomaEliminado,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al eliminar idioma" });
    }
};

module.exports = {
    getIdiomas,
    getIdiomaById,
    createIdioma,
    updateIdioma,
    deleteIdioma,
};
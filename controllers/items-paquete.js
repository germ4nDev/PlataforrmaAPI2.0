// /*
//     Author: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const PTLItemsPaquete = require('../models/item-paquete')(sequelize);
// const { io } = require('../index');

// const getItemsPaquete = async(req, res) => {
//     try {
//         const itemsPaquete = await PTLItemsPaquete.findAll();
//         return res.status(201).json({
//             ok: true,
//             itemsPaquete: itemsPaquete,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al obtener ItemsPaquete, ' + err });
//     }
// };

// const getItemsPaqueteById = async(req, res) => {
//     try {
//         const codigoItem = req.params.id;
//         const itemsPaquete = await PTLItemsPaquete.findOne({
//             where: { codigoItem },
//         });
//         if (!itemsPaquete) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un itemsPaquete con ese id",
//             });
//         }
//         return res.status(201).json({
//             ok: true,
//             itemsPaquete: itemsPaquete,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al obtener el paquete' });
//     }
// };

// const getItemsPaqueteByCode = async(req, res) => {
//     try {
//         const codego = req.params.code;
//         const itemsPaquete = await PTLItemsPaquete.findAll({
//             where: {
//                 codigoPaquete: codego,
//             },
//         });
//         if (!itemsPaquete) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un itemsPaquete por el codigo",
//             });
//         }
//         return res.status(201).json({
//             ok: true,
//             itemsPaquete: itemsPaquete,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al obtener itemsPaquete" });
//     }
// };

// const createItemsPaquete = async(req, res = response) => {
//     const {...newRegistro } = req.body;
//     console.log('crear registro', newRegistro);
//     try {
//         const existente = await PTLItemsPaquete.findOne({
//             where: { codigoItem: newRegistro.codigoItem }
//         });

//         if (existente) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: `El código ${newRegistro.codigoItem} ya está registrado`
//             });
//         }

//         const nuevo = await PTLItemsPaquete.create(newRegistro);

//         if (typeof io !== 'undefined') {
//             io.emit('items-paquete-actualizados', {
//                 action: 'create',
//                 msg: `Items Paquete creado: ${nuevo.codigoItem}`
//             });
//         } else {
//             console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
//         }

//         return res.status(201).json({
//             ok: true,
//             paquete: nuevo,
//         });

//     } catch (err) {
//         console.error('--- ERROR EN CREATE PAQUETE ---');
//         console.error(err);

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
//             msg: err.message
//         });
//     }
// };

// const updateItemsPaquete = async(req, res = response) => {
//     const { codigoItem, ...data } = req.body;
//     try {
//         const itemsPaqueteOg = await PTLItemsPaquete.findOne({
//             where: { codigoItem },
//         });
//         if (!itemsPaqueteOg) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un paquete con ese id",
//             });
//         }
//         await PTLItemsPaquete.update(data, {
//             where: { codigoItem },
//         });
//         const itemsPaqueteActualizado = await PTLItemsPaquete.findOne({
//             where: { codigoItem },
//         });
//         io.emit('items-paquete-actualizados', {
//             action: 'update',
//             msg: `Item actualizado: ${itemsPaqueteActualizado.nombreItem}`
//         });
//         return res.status(201).json({
//             ok: true,
//             itemsPaquete: itemsPaqueteActualizado,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al actualizar el paquete' });
//     }
// };

// const deleteItemsPaquete = async(req, res = response) => {
//     try {
//         const codigoItem = req.params.id;
//         const itemsPaquete = await PTLItemsPaquete.findOne({
//             where: { codigoItem },
//         });
//         if (!itemsPaquete) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un paquete con ese id",
//             });
//         }
//         const itemsPaqueteEliminado = await PTLItemsPaquete.destroy({
//             where: { codigoItem },
//         });
//         io.emit('items-paquete-actualizados', {
//             action: 'delete',
//             msg: `Item eliminado: ${itemsPaquete.nombreItem}`
//         });
//         return res.status(201).json({
//             ok: true,
//             itemsPaquete: itemsPaqueteEliminado
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Error al eliminar itemsPaquete' });
//     }
// };

// module.exports = {
//     getItemsPaquete,
//     getItemsPaqueteById,
//     getItemsPaqueteByCode,
//     createItemsPaquete,
//     updateItemsPaquete,
//     deleteItemsPaquete,
// };

/*
    Author: German Valencia
*/
const { response } = require('express');
const itemsPaqueteService = require('../services/items-paquete.service'); // Ajusta la ruta a tu proyecto

const getItemsPaquete = async (req, res = response) => {
    try {
        const itemsPaquete = await itemsPaqueteService.obtenerItemsPaquete();

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            itemsPaquete: itemsPaquete,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener ItemsPaquete' });
    }
};

const getItemsPaqueteById = async (req, res = response) => {
    try {
        const itemsPaquete = await itemsPaqueteService.obtenerItemPaquetePorId(req.params.id);

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            itemsPaquete: itemsPaquete,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: 'Error al obtener el itemPaquete' });
    }
};

const getItemsPaqueteByCode = async (req, res = response) => {
    try {
        const codigo = req.params.code; // Corregido el typo 'codego'
        const itemsPaquete = await itemsPaqueteService.obtenerItemsPaquetePorCodigo(codigo);

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            itemsPaquete: itemsPaquete,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al obtener itemsPaquete" });
    }
};

const createItemsPaquete = async (req, res = response) => {
    try {
        const nuevoItem = await itemsPaqueteService.crearItemPaquete(req.body);

        return res.status(201).json({
            ok: true,
            itemPaquete: nuevoItem, // Corregido: devolvía 'paquete'
        });
    } catch (err) {
        console.error('--- ERROR EN CREATE ITEM PAQUETE ---'); // Corregido el msj
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

const updateItemsPaquete = async (req, res = response) => {
    try {
        const { codigoItem, ...data } = req.body;

        const itemsPaqueteActualizado = await itemsPaqueteService.actualizarItemPaquete(codigoItem, data);

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            itemsPaquete: itemsPaqueteActualizado,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: 'Error al actualizar el itemPaquete' });
    }
};

const deleteItemsPaquete = async (req, res = response) => {
    try {
        const itemsPaqueteEliminado = await itemsPaqueteService.eliminarItemPaquete(req.params.id);

        return res.status(200).json({ // Cambiado a 200
            ok: true,
            itemsPaquete: itemsPaqueteEliminado
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: 'Error al eliminar itemsPaquete' });
    }
};

module.exports = {
    getItemsPaquete,
    getItemsPaqueteById,
    getItemsPaqueteByCode,
    createItemsPaquete,
    updateItemsPaquete,
    deleteItemsPaquete,
};
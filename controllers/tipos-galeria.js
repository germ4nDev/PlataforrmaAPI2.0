// /*
//     Author: German Valencia
//     Actualización: Juan Camilo Valencia
// */
// const express = require("express");
// const sequelize = require("../database/connection");
// const PTLTipoGaleria = require("../models/tipo-galeria")(sequelize);
// const { io } = require("../index");

// const getTipoGaleria = async(req, res) => {
//     try {
//         const tiposGaleria = await PTLTipoGaleria.findAll();
//         return res.status(201).json({
//             ok: true,
//             tiposGaleria: tiposGaleria,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al obtener los Tipos de Galería" });
//     }
// };

// const getTipoGaleriaById = async(req, res) => {
//     try {
//         const codigoTipo = req.params.id;

//         const tipoGaleria = await PTLTipoGaleria.findOne({
//             where: {
//                 codigoTipo: codigoTipo,
//             },
//         });

//         if (!tipoGaleria) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un tipo de galería con ese id",
//             });
//         }

//         return res.status(201).json({
//             ok: true,
//             tipoGaleria: tipoGaleria,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al obtener el tipo de galería" });
//     }
// };

// const createTipoGaleria = async(req, res = response) => {
//     try {
//         const {...nuevoTipoGaleria } = req.body;
//         const tipoGaleriaDB = await PTLTipoGaleria.create(nuevoTipoGaleria);
//         io.emit("tiposGaleria-actualizadas", {
//             action: "create",
//             msg: `Tipo de Galería creado: ${tipoGaleriaDB.nombreTipoGaleria}`,
//         });
//         return res.status(201).json({
//             ok: true,
//             tipoGaleria: tipoGaleriaDB,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al crear el tipo de galería",
//         });
//     }
// };

// const updateTipoGaleria = async(req, res = response) => {
//     try {
//         const { codigoTipo, ...data } = req.body;
//         const tipoGaleriaDB = await PTLTipoGaleria.findOne({
//             where: { codigoTipo },
//         });

//         if (!tipoGaleriaDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un tipo de galería con ese ID",
//             });
//         }

//         await PTLTipoGaleria.update(data, {
//             where: { codigoTipo },
//         });

//         const tipoGaleriaActualizado = await PTLTipoGaleria.findOne({
//             where: { codigoTipo },
//         });

//         io.emit("tiposGaleria-actualizadas", {
//             action: "update",
//             msg: `Tipo de Galería actualizado: ${tipoGaleriaActualizado.nombreTipo}`,
//         });

//         return res.status(200).json({
//             ok: true,
//             tipoGaleria: tipoGaleriaActualizado,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al actualizar el tipo de galería",
//         });
//     }
// };

// const deleteTipoGaleria = async(req, res = response) => {
//     try {
//         const codigoTipo = req.params.id;
//         const tipoGaleriaDB = await PTLTipoGaleria.findOne({
//             where: { codigoTipo },
//         });

//         if (!tipoGaleriaDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un tipo de galería con ese ID",
//             });
//         }
//         const tipoGaleriaEliminado = await PTLTipoGaleria.destroy({
//             where: { codigoTipo },
//         });

//         io.emit("tiposGaleria-actualizadas", {
//             action: "delete",
//             msg: `Tipo de Galería eliminado correctamente`,
//         });

//         return res.status(200).json({
//             ok: true,
//             tipoGaleria: tipoGaleriaEliminado,
//             msg: "El tipo de galería se eliminó correctamente",
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al eliminar el tipo de galería",
//         });
//     }
// };

// module.exports = {
//     getTipoGaleria,
//     getTipoGaleriaById,
//     createTipoGaleria,
//     updateTipoGaleria,
//     deleteTipoGaleria,
// };

/*
    Author: German Valencia
    Actualización: Juan Camilo Valencia
*/
const { response } = require("express");
const tiposGaleriaService = require("../services/tipos-galeria.service"); // Ajusta la ruta a tu proyecto

const getTipoGaleria = async (req, res = response) => {
    try {
        const tiposGaleria = await tiposGaleriaService.obtenerTiposGaleria();

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            tiposGaleria: tiposGaleria,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los Tipos de Galería" });
    }
};

const getTipoGaleriaById = async (req, res = response) => {
    try {
        const tipoGaleria = await tiposGaleriaService.obtenerTipoGaleriaPorId(req.params.id);

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            tipoGaleria: tipoGaleria,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al obtener el tipo de galería" });
    }
};

const createTipoGaleria = async (req, res = response) => {
    try {
        const tipoGaleriaDB = await tiposGaleriaService.crearTipoGaleria(req.body);

        return res.status(201).json({
            ok: true,
            tipoGaleria: tipoGaleriaDB,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al crear el tipo de galería",
        });
    }
};

const updateTipoGaleria = async (req, res = response) => {
    try {
        const { codigoTipo, ...data } = req.body;

        const tipoGaleriaActualizado = await tiposGaleriaService.actualizarTipoGaleria(codigoTipo, data);

        return res.status(200).json({
            ok: true,
            tipoGaleria: tipoGaleriaActualizado,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al actualizar el tipo de galería",
        });
    }
};

const deleteTipoGaleria = async (req, res = response) => {
    try {
        const tipoGaleriaEliminado = await tiposGaleriaService.eliminarTipoGaleria(req.params.id);

        return res.status(200).json({
            ok: true,
            tipoGaleria: tipoGaleriaEliminado,
            msg: "El tipo de galería se eliminó correctamente",
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al eliminar el tipo de galería",
        });
    }
};

module.exports = {
    getTipoGaleria,
    getTipoGaleriaById,
    createTipoGaleria,
    updateTipoGaleria,
    deleteTipoGaleria,
};
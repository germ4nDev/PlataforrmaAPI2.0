// /*
//     Author: German Valencia
//     Actualización: Juab Camilo Valencia
// */
// const express = require("express");
// const sequelize = require("../database/connection");
// const PTLFormatoGaleria = require("../models/formato-galeria")(sequelize);
// const { io } = require("../index");

// const getFormatoGaleria = async(req, res) => {
//     try {
//         const formatosGaleria = await PTLFormatoGaleria.findAll();
//         return res.status(201).json({
//             ok: true,
//             formatosGaleria: formatosGaleria,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al obtener los Formatos de Galería" });
//     }
// };

// const getFormatoGaleriaById = async(req, res) => {
//     try {
//         const codigoFormato = req.params.id;
//         const formatoGaleria = await PTLFormatoGaleria.findOne({
//             where: {
//                 codigoFormato: codigoFormato,
//             },
//         });
//         if (!formatoGaleria) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un formato de galería con ese id",
//             });
//         }
//         return res.status(201).json({
//             ok: true,
//             formatoGaleria: formatoGaleria,
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error al obtener el formato de galería" });
//     }
// };

// const createFormatoGaleria = async(req, res = response) => {
//     try {
//         const {...nuevoFormatoGaleria } = req.body;
//         const formatoGaleriaDB =
//             await PTLFormatoGaleria.create(nuevoFormatoGaleria);
//         io.emit("formatos-galeria-actualizadas", {
//             action: "create",
//             msg: `Formato de Galería creado: ${formatoGaleriaDB.nombreFormato}`,
//         });
//         return res.status(201).json({
//             ok: true,
//             formatoGaleria: formatoGaleriaDB,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al crear el formato de galería",
//         });
//     }
// };

// const updateFormatoGaleria = async(req, res = response) => {
//     try {
//         const { codigoFormato, ...data } = req.body;

//         const formatoGaleriaDB = await PTLFormatoGaleria.findOne({
//             where: { codigoFormato },
//         });

//         if (!formatoGaleriaDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un formato de galería con ese ID",
//             });
//         }

//         await PTLFormatoGaleria.update(data, {
//             where: { codigoFormato },
//         });

//         const formatoGaleriaActualizado = await PTLFormatoGaleria.findOne({
//             where: { codigoFormato },
//         });

//         io.emit("formatos-galeria-actualizadas", {
//             action: "update",
//             msg: `Formato de Galería actualizado: ${formatoGaleriaActualizado.nombreFormato}`,
//         });

//         return res.status(200).json({
//             ok: true,
//             formatoGaleria: formatoGaleriaActualizado,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al actualizar el formato de galería",
//         });
//     }
// };

// const deleteFormatoGaleria = async(req, res = response) => {
//     try {
//         const codigoFormato = req.params.id;

//         const formatoGaleriaDB = await PTLFormatoGaleria.findOne({
//             where: { codigoFormato },
//         });

//         if (!formatoGaleriaDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un formato de galería con ese ID",
//             });
//         }

//         const formatoGaleriaEliminado = await PTLFormatoGaleria.destroy({
//             where: { codigoFormato },
//         });

//         io.emit("formatos-galeria-actualizadas", {
//             action: "delete",
//             msg: `Formato de Galería eliminado correctamente`,
//         });

//         return res.status(200).json({
//             ok: true,
//             formatoGaleria: formatoGaleriaEliminado,
//             msg: "El formato de galería se eliminó correctamente",
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al eliminar el formato de galería",
//         });
//     }
// };

// module.exports = {
//     getFormatoGaleria,
//     getFormatoGaleriaById,
//     createFormatoGaleria,
//     updateFormatoGaleria,
//     deleteFormatoGaleria,
// };

/*
    Author: German Valencia
    Actualización: Juan Camilo Valencia
*/
const { response } = require("express");
const formatosGaleriaService = require("../services/formatos-galeria.service"); // Ajusta la ruta a tu proyecto

const getFormatoGaleria = async (req, res = response) => {
    try {
        const formatosGaleria = await formatosGaleriaService.obtenerFormatosGaleria();

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            formatosGaleria: formatosGaleria,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los Formatos de Galería" });
    }
};

const getFormatoGaleriaById = async (req, res = response) => {
    try {
        const formatoGaleria = await formatosGaleriaService.obtenerFormatoGaleriaPorId(req.params.id);

        return res.status(200).json({ // Cambiado de 201 a 200
            ok: true,
            formatoGaleria: formatoGaleria,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al obtener el formato de galería" });
    }
};

const createFormatoGaleria = async (req, res = response) => {
    try {
        const formatoGaleriaDB = await formatosGaleriaService.crearFormatoGaleria(req.body);

        return res.status(201).json({
            ok: true,
            formatoGaleria: formatoGaleriaDB,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al crear el formato de galería",
        });
    }
};

const updateFormatoGaleria = async (req, res = response) => {
    try {
        const { codigoFormato, ...data } = req.body;

        const formatoGaleriaActualizado = await formatosGaleriaService.actualizarFormatoGaleria(codigoFormato, data);

        return res.status(200).json({
            ok: true,
            formatoGaleria: formatoGaleriaActualizado,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al actualizar el formato de galería",
        });
    }
};

const deleteFormatoGaleria = async (req, res = response) => {
    try {
        const formatoGaleriaEliminado = await formatosGaleriaService.eliminarFormatoGaleria(req.params.id);

        return res.status(200).json({
            ok: true,
            formatoGaleria: formatoGaleriaEliminado,
            msg: "El formato de galería se eliminó correctamente",
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al eliminar el formato de galería",
        });
    }
};

module.exports = {
    getFormatoGaleria,
    getFormatoGaleriaById,
    createFormatoGaleria,
    updateFormatoGaleria,
    deleteFormatoGaleria,
};
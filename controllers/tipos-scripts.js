// /*
//     Author: Juan Valencia
// */

// const express = require("express");
// const sequelize = require("../database/connection");
// const PTLTiposScripts = require("../models/tipo-script")(sequelize);
// const { io } = require("../index");

// const getTiposScripts = async (req, res = response) => {
//     try {
//         const tiposScripts = await PTLTiposScripts.findAll();
//         return res.status(200).json({
//             ok: true,
//             tiposScripts: tiposScripts,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error al obtener los tipos de scripts" });
//     }
// };

// const getTipoScriptById = async (req, res = response) => {
//     try {
//         const codigoTipo = req.params.id;
//         const tipoScript = await PTLTiposScripts.findOne({
//             where: { codigoTipo: codigoTipo },
//         });

//         if (!tipoScript) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un tipo de script con ese id",
//             });
//         }
//         return res.status(200).json({
//             ok: true,
//             tipoScript: tipoScript,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error al obtener el tipo de script" });
//     }
// };

// const createTipoScript = async (req, res = response) => {
//     try {
//         const { ...nuevoTipoScript } = req.body;

//         const tipoScriptDB = await PTLTiposScripts.create(nuevoTipoScript);

//         io.emit("tiposScripts-actualizados", {
//             action: "create",
//             msg: `Tipo de script creado: ${tipoScriptDB.nombreTipo}`,
//         });

//         return res.status(201).json({
//             ok: true,
//             tipoScript: tipoScriptDB,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al crear el tipo de script",
//         });
//     }
// };

// const updateTipoScript = async (req, res = response) => {
//     try {
//         const { codigoTipo, ...data } = req.body;

//         const tipoScriptDB = await PTLTiposScripts.findOne({
//             where: { codigoTipo },
//         });

//         if (!tipoScriptDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un tipo de script con ese ID",
//             });
//         }

//         await PTLTiposScripts.update(data, {
//             where: { codigoTipo },
//         });

//         const tipoScriptActualizado = await PTLTiposScripts.findOne({
//             where: { codigoTipo },
//         });

//         io.emit("tiposScripts-actualizados", {
//             action: "update",
//             msg: `Tipo de script actualizado: ${tipoScriptActualizado.nombreTipo}`,
//         });

//         return res.status(200).json({
//             ok: true,
//             tipoScript: tipoScriptActualizado,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al actualizar el tipo de script",
//         });
//     }
// };

// const deleteTipoScript = async (req, res = response) => {
//     try {
//         const codigoTipo = req.params.id;

//         const tipoScriptDB = await PTLTiposScripts.findOne({
//             where: { codigoTipo },
//         });

//         if (!tipoScriptDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un tipo de script con ese ID",
//             });
//         }

//         const tipoScriptEliminado = await PTLTiposScripts.destroy({
//             where: { codigoTipo },
//         });

//         io.emit("tiposScripts-actualizados", {
//             action: "delete",
//             msg: `Tipo de script eliminado correctamente`,
//         });

//         return res.status(200).json({
//             ok: true,
//             tipoScript: tipoScriptEliminado,
//             msg: "El tipo de script se eliminó correctamente",
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al eliminar el tipo de script",
//         });
//     }
// };

// module.exports = {
//     getTiposScripts,
//     getTipoScriptById,
//     createTipoScript,
//     updateTipoScript,
//     deleteTipoScript,
// };

/*
    Author: Juan Valencia
*/
const { response } = require("express");
const tiposScriptsService = require("../services/tipos-scripts.service"); // Ajusta la ruta a tu proyecto

const getTiposScripts = async (req, res = response) => {
    try {
        const tiposScripts = await tiposScriptsService.obtenerTiposScripts();

        return res.status(200).json({
            ok: true,
            tiposScripts: tiposScripts,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los tipos de scripts" });
    }
};

const getTipoScriptById = async (req, res = response) => {
    try {
        const tipoScript = await tiposScriptsService.obtenerTipoScriptPorId(req.params.id);

        return res.status(200).json({
            ok: true,
            tipoScript: tipoScript,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al obtener el tipo de script" });
    }
};

const createTipoScript = async (req, res = response) => {
    try {
        const tipoScriptDB = await tiposScriptsService.crearTipoScript(req.body);

        return res.status(201).json({
            ok: true,
            tipoScript: tipoScriptDB,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: "Error al crear el tipo de script",
        });
    }
};

const updateTipoScript = async (req, res = response) => {
    try {
        const { codigoTipo, ...data } = req.body;

        const tipoScriptActualizado = await tiposScriptsService.actualizarTipoScript(codigoTipo, data);

        return res.status(200).json({
            ok: true,
            tipoScript: tipoScriptActualizado,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al actualizar el tipo de script",
        });
    }
};

const deleteTipoScript = async (req, res = response) => {
    try {
        const tipoScriptEliminado = await tiposScriptsService.eliminarTipoScript(req.params.id);

        return res.status(200).json({
            ok: true,
            tipoScript: tipoScriptEliminado,
            msg: "El tipo de script se eliminó correctamente",
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al eliminar el tipo de script",
        });
    }
};

module.exports = {
    getTiposScripts,
    getTipoScriptById,
    createTipoScript,
    updateTipoScript,
    deleteTipoScript,
};
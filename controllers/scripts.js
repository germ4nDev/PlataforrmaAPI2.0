// /*
//     Author: Juan Valencia
// */

// const express = require("express");
// const sequelize = require("../database/connection");
// const PTLScripts = require("../models/scripts")(sequelize);
// const { io } = require("../index");

// const getScripts = async (req, res = response) => {
//     try {
//         const scripts = await PTLScripts.findAll();
//         return res.status(200).json({
//             ok: true,
//             scripts: scripts,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error al obtener los scripts" });
//     }
// };

// const getScriptById = async (req, res = response) => {
//     try {
//         const codigoScript = req.params.id;
//         const script = await PTLScripts.findOne({
//             where: { codigoScript: codigoScript },
//         });

//         if (!script) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un script con ese id",
//             });
//         }
//         return res.status(200).json({
//             ok: true,
//             script: script,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error al obtener el script" });
//     }
// };

// const createScript = async (req, res = response) => {
//     try {
//         const { ...nuevoScript } = req.body;

//         const scriptDB = await PTLScripts.create(nuevoScript);

//         io.emit("scripts-actualizados", {
//             action: "create",
//             msg: `Script creado: ${scriptDB.nombreScript}`,
//         });

//         return res.status(201).json({
//             ok: true,
//             script: scriptDB,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al crear el script",
//         });
//     }
// };

// const updateScript = async (req, res = response) => {
//     try {
//         const { codigoScript, ...data } = req.body;

//         const scriptDB = await PTLScripts.findOne({
//             where: { codigoScript },
//         });

//         if (!scriptDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un script con ese ID",
//             });
//         }

//         await PTLScripts.update(data, {
//             where: { codigoScript },
//         });

//         const scriptActualizado = await PTLScripts.findOne({
//             where: { codigoScript },
//         });

//         io.emit("scripts-actualizados", {
//             action: "update",
//             msg: `Script actualizado: ${scriptActualizado.nombreScript}`,
//         });

//         return res.status(200).json({
//             ok: true,
//             script: scriptActualizado,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al actualizar el script",
//         });
//     }
// };

// const deleteScript = async (req, res = response) => {
//     try {
//         const codigoScript = req.params.id;

//         const scriptDB = await PTLScripts.findOne({
//             where: { codigoScript },
//         });

//         if (!scriptDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "No existe un script con ese ID",
//             });
//         }

//         const scriptEliminado = await PTLScripts.destroy({
//             where: { codigoScript },
//         });

//         io.emit("scripts-actualizados", {
//             action: "delete",
//             msg: `Script eliminado correctamente`,
//         });

//         return res.status(200).json({
//             ok: true,
//             script: scriptEliminado,
//             msg: "El script se eliminó correctamente",
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             ok: false,
//             error: "Error al eliminar el script",
//         });
//     }
// };

// module.exports = {
//     getScripts,
//     getScriptById,
//     createScript,
//     updateScript,
//     deleteScript,
// };

/*
    Author: Juan Valencia
*/
const { response } = require("express");
const scriptsService = require("../services/scripts.service"); // Ajusta la ruta a tu proyecto

const getScripts = async (req, res = response) => {
    try {
        const scripts = await scriptsService.obtenerScripts();

        return res.status(200).json({
            ok: true,
            scripts: scripts,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los scripts" });
    }
};

const getScriptById = async (req, res = response) => {
    try {
        const script = await scriptsService.obtenerScriptPorId(req.params.id);

        return res.status(200).json({
            ok: true,
            script: script,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        res.status(500).json({ error: "Error al obtener el script" });
    }
};

const createScript = async (req, res = response) => {
    try {
        const scriptDB = await scriptsService.crearScript(req.body);

        return res.status(201).json({
            ok: true,
            script: scriptDB,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al crear el script",
        });
    }
};

const updateScript = async (req, res = response) => {
    try {
        const { codigoScript, ...data } = req.body;

        const scriptActualizado = await scriptsService.actualizarScript(codigoScript, data);

        return res.status(200).json({
            ok: true,
            script: scriptActualizado,
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al actualizar el script",
        });
    }
};

const deleteScript = async (req, res = response) => {
    try {
        const scriptEliminado = await scriptsService.eliminarScript(req.params.id);
        return res.status(200).json({
            ok: true,
            script: scriptEliminado,
            msg: "El script se eliminó correctamente",
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            error: "Error al eliminar el script",
        });
    }
};

module.exports = {
    getScripts,
    getScriptById,
    createScript,
    updateScript,
    deleteScript,
};
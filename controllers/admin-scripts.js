/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require('express');
const ScriptsService = require('../services/admin-scripts.service');
const service = new ScriptsService();

const ejecutarScript = async (req, res = response) => {
    try {
        const rawData = {
            nombreArchivo: req.body.archivo,
            nombreDb: req.body.database
        };

        const mensajeExito = await service.ejecutarScript(rawData);

        return res.status(200).json({
            ok: true,
            msg: mensajeExito
        });

    } catch (error) {
        console.error('Error al ejecutar DDL:', error);

        if (error.type === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: 'Error de validación en los datos enviados',
                detalles: error.details
            });
        }

        if (error.statusCode) {
            return res.status(error.statusCode).json({ ok: false, msg: error.msg });
        }

        const mensajeReal = error.original ? error.original.message : error.message;
        return res.status(500).json({
            ok: false,
            msg: 'Error al procesar el archivo o ejecutar el script.',
            detalle: mensajeReal
        });
    }
};

const ejecutarScriptMultiDb = async (req, res = response) => {
    try {
        const rawData = {
            nombreArchivo: req.body.archivo,
            nombresDbs: req.body.databases
        };

        const resultados = await service.ejecutarScriptMultiDb(rawData);

        if (resultados.fallidos.length === 0) {
            return res.status(200).json({
                ok: true,
                msg: 'Script ejecutado con éxito en TODAS las bases de datos.',
                resultados
            });
        } else {
            return res.status(207).json({ // 207 Multi-Status
                ok: false,
                msg: 'El proceso terminó, pero hubo errores en algunas bases de datos.',
                resultados
            });
        }

    } catch (error) {
        console.error('Error general en ejecución masiva:', error);

        if (error.type === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: 'Error de validación en los datos enviados',
                detalles: error.details
            });
        }

        if (error.statusCode) {
            return res.status(error.statusCode).json({ ok: false, msg: error.msg });
        }

        return res.status(500).json({
            ok: false,
            msg: 'Error crítico al procesar la solicitud.',
            detalle: error.message
        });
    }
};

module.exports = {
    ejecutarScript,
    ejecutarScriptMultiDb
};
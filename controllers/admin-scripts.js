const fs = require('fs').promises;
const path = require('path');
const { Sequelize } = require('sequelize');

const adminSequelize = new Sequelize(process.env.DB_NAME_MASTER, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    logging: console.log,
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    }
});

const ejecutarScript = async(req, res) => {
    try {
        const {...data } = req.body;
        const nombreArchivo = data.archivo;
        const nombreDb = data.database;

        if (!nombreArchivo) {
            return res.status(400).json({ ok: false, msg: 'Debe enviar el nombre del archivo.' });
        }
        if (nombreArchivo.includes('..') || nombreArchivo.includes('/')) {
            return res.status(403).json({ ok: false, msg: 'Nombre de archivo no permitido.' });
        }

        if (!nombreDb || !/^[a-zA-Z0-9_]+$/.test(nombreDb)) {
            return res.status(400).json({
                ok: false,
                msg: 'Debe enviar un nombreDb válido (solo letras, números y guiones bajos, sin espacios).'
            });
        }

        const rutaArchivo = path.join(
            __dirname,
            '..',
            'uploads',
            'plataforma',
            'scripts',
            nombreArchivo
        );

        try {
            await fs.access(rutaArchivo);
        } catch (err) {
            return res.status(404).json({ ok: false, msg: 'El archivo de script no existe.' });
        }

        let scriptSql = await fs.readFile(rutaArchivo, 'utf8');
        scriptSql = scriptSql.replace(/##NOMBRE_DB##/g, nombreDb);
        await adminSequelize.authenticate();
        await adminSequelize.query(scriptSql);

        return res.status(200).json({
            ok: true,
            msg: `El script ${nombreArchivo} se ejecutó correctamente para la base de datos: ${nombreDb}.`
        });

    } catch (error) {
        console.error('Error al ejecutar DDL:', error);
        const mensajeReal = error.original ? error.original.message : error.message;

        return res.status(500).json({
            ok: false,
            msg: 'Error al procesar el archivo o ejecutar el script.',
            detalle: mensajeReal
        });
    }
};

const ejecutarScriptMultiDb = async(req, res) => {
    try {
        const {...data } = req.body;
        const nombreArchivo = data.archivo;
        const nombresDbs = data.databases;

        if (!nombreArchivo || nombreArchivo.includes('..') || nombreArchivo.includes('/')) {
            return res.status(400).json({ ok: false, msg: 'Nombre de archivo inválido.' });
        }

        if (!Array.isArray(nombresDbs) || nombresDbs.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Debe enviar un arreglo nombresDbs con al menos una base de datos.'
            });
        }

        const rutaArchivo = path.join(
            __dirname,
            '..',
            'uploads',
            'plataforma',
            'scripts',
            nombreArchivo
        );
        let scriptBase;

        try {
            scriptBase = await fs.readFile(rutaArchivo, 'utf8');
        } catch (err) {
            return res.status(404).json({ ok: false, msg: 'El archivo de script no existe.' });
        }

        await adminSequelize.authenticate();
        const resultados = {
            exitosos: [],
            fallidos: []
        };

        for (const dbName of nombresDbs) {
            if (!/^[a-zA-Z0-9_]+$/.test(dbName)) {
                resultados.fallidos.push({ bd: dbName, error: 'Nombre con formato inválido.' });
                continue;
            }

            try {
                const scriptAEjecutar = scriptBase.replace(/##NOMBRE_DB##/g, dbName);
                await adminSequelize.query(scriptAEjecutar);
                resultados.exitosos.push(dbName);
            } catch (error) {
                const mensajeReal = error.original ? error.original.message : error.message;
                resultados.fallidos.push({ bd: dbName, error: mensajeReal });
            }
        }

        if (resultados.fallidos.length === 0) {
            return res.status(200).json({
                ok: true,
                msg: 'Script ejecutado con éxito en TODAS las bases de datos.',
                resultados
            });
        } else {
            return res.status(207).json({
                ok: false,
                msg: 'El proceso terminó, pero hubo errores en algunas bases de datos.',
                resultados
            });
        }

    } catch (error) {
        console.error('Error general en ejecución masiva:', error);
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
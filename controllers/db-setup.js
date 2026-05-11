// const fs = require('fs');
// const path = require('path');
// const { response } = require('express');
// const { sequelize } = require('../database/connection');

// const SCRIPT_PATH = path.join(__dirname, '..', 'database', 'plataforma_db.sql');

// const runDBScript = async (req, res = response) => {
//     try {
//         console.log(`Intentando leer script en: ${SCRIPT_PATH}`);

//         // 1. Verificar y leer el contenido del script SQL
//         if (!fs.existsSync(SCRIPT_PATH)) {
//             console.error(`ERROR: Archivo no encontrado en la ruta: ${SCRIPT_PATH}`);
//             return res.status(500).json({
//                 ok: false,
//                 msg: 'El archivo de script SQL no fue encontrado en el servidor. Revise la ruta.',
//                 ruta_verificada: SCRIPT_PATH
//             });
//         }

//         const sqlScript = fs.readFileSync(SCRIPT_PATH, 'utf-8');

//         const [results, metadata] = await sequelize.query(sqlScript, {
//             type: sequelize.QueryTypes.RAW,
//             multiple: true
//         });

//         console.log('Script SQL ejecutado exitosamente.');

//         return res.json({
//             ok: true,
//             msg: 'Estructura de base de datos creada/actualizada exitosamente.',
//             detalles: {
//                 comandos_procesados: metadata.length // Muestra cuántos comandos fueron procesados
//             }
//         });

//     } catch (error) {
//         console.error('Error al ejecutar el script SQL:', error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Error interno al ejecutar el script de base de datos.',
//             error_detallado: error.message
//         });
//     }
// };

// module.exports = {
//     runDBScript
// };

const { response } = require('express');
const dbScriptService = require('../services/db-script.service');

const runDBScript = async (req, res = response) => {
    try {
        const metadata = await dbScriptService.ejecutarScriptBD();

        return res.status(200).json({
            ok: true,
            msg: 'Estructura de base de datos creada/actualizada exitosamente.',
            detalles: {
                comandos_procesados: metadata ? metadata.length : 0
            }
        });

    } catch (error) {
        console.error('Error al ejecutar el script SQL:', error);

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                ok: false,
                msg: error.msg,
                ruta_verificada: error.ruta_verificada
            });
        }

        return res.status(500).json({
            ok: false,
            msg: 'Error interno al ejecutar el script de base de datos.',
            error_detallado: error.message
        });
    }
};

module.exports = {
    runDBScript
};
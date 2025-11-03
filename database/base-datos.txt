IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PTLAplicaciones')
BEGIN
    CREATE TABLE PTLAplicaciones (
        id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWID(),
        codigoAplicacion NVARCHAR(50) NOT NULL UNIQUE,
        nombreAplicacion NVARCHAR(255) NOT NULL,
        descripcionAplicacion NVARCHAR(MAX),
        -- Campos de auditoría (asumiendo que los usas)
        codigoUsuarioCreacion NVARCHAR(50) NOT NULL,
        fechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
        fechaActualizacion DATETIME
    );
    PRINT 'Tabla PTLAplicaciones creada.';
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PTLRoles')
BEGIN
    CREATE TABLE PTLRoles (
        id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWID(),
        nombreRol NVARCHAR(100) NOT NULL UNIQUE,
        descripcionRol NVARCHAR(255)
    );
    PRINT 'Tabla PTLRoles creada.';
END
GO

-- Ejemplo de inserción de datos iniciales
IF NOT EXISTS (SELECT 1 FROM PTLRoles WHERE nombreRol = 'ADMIN')
BEGIN
    INSERT INTO PTLRoles (nombreRol, descripcionRol)
    VALUES ('ADMIN', 'Administrador del Sistema');
    PRINT 'Rol ADMIN insertado.';
END
GO



------------------------------------
CONEXION

const { Sequelize } = require('sequelize');

// Reemplaza con tus credenciales de SQL Server
const sequelize = new Sequelize('TU_BASE_DE_DATOS', 'TU_USUARIO', 'TU_PASSWORD', {
    host: 'TU_HOST', // Por ejemplo: 'localhost' o '127.0.0.1'
    dialect: 'mssql', // Asegúrate de que este es el dialecto correcto para SQL Server
    logging: console.log,
    dialectOptions: {
        // Puedes agregar opciones específicas para SQL Server si son necesarias
        // Por ejemplo, para deshabilitar la encriptación si no la usas:
        // options: { trustServerCertificate: true } 
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Autenticar la conexión (opcional, pero buena práctica)
const dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión con la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar con la base de datos:', error);
    }
};

module.exports = {
    sequelize,
    dbConnect
};



=============================================
CONTROLADOR

const fs = require('fs');
const path = require('path');
const { response } = require('express');

// Importamos la instancia de sequelize desde el archivo de conexión
// Asegúrate de que tu archivo connection.js exporte la instancia.
const { sequelize } = require('../database/connection'); 

// Determinamos la ruta absoluta del script SQL
// Se asume que el archivo 'db-setup.sql' está un nivel arriba del controlador,
// dentro de una carpeta llamada 'sql'.
// Estructura: /src/controllers/db-controller.js --> /src/sql/db-setup.sql
const SCRIPT_PATH = path.join(__dirname, '..', 'sql', 'db-setup.sql'); 

/**
 * Ejecuta el script SQL (db-setup.sql) para crear o actualizar la estructura
 * de la base de datos.
 * Esta función es un controlador de Express (middleware).
 */
const runDBScript = async (req, res = response) => {
    try {
        console.log(`Intentando leer script en: ${SCRIPT_PATH}`);

        // 1. Verificar y leer el contenido del script SQL
        if (!fs.existsSync(SCRIPT_PATH)) {
            console.error(`ERROR: Archivo no encontrado en la ruta: ${SCRIPT_PATH}`);
            return res.status(500).json({
                ok: false,
                msg: 'El archivo de script SQL no fue encontrado en el servidor. Revise la ruta.',
                ruta_verificada: SCRIPT_PATH
            });
        }

        const sqlScript = fs.readFileSync(SCRIPT_PATH, 'utf-8');
        
        // 2. Ejecutar el script usando sequelize.query()
        // type: sequelize.QueryTypes.RAW -> Indica que el contenido es SQL crudo (T-SQL)
        // multiple: true -> ¡CRUCIAL para SQL Server! Permite que Sequelize divida y ejecute 
        //                    múltiples comandos separados por 'GO', esencial en T-SQL.
        const [results, metadata] = await sequelize.query(sqlScript, {
            type: sequelize.QueryTypes.RAW,
            multiple: true 
        });

        console.log('Script SQL ejecutado exitosamente.');
        
        return res.json({
            ok: true,
            msg: 'Estructura de base de datos creada/actualizada exitosamente.',
            detalles: {
                comandos_procesados: metadata.length // Muestra cuántos comandos fueron procesados
            }
        });

    } catch (error) {
        // Manejo de errores de Sequelize o de lectura de archivos
        console.error('Error al ejecutar el script SQL:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno al ejecutar el script de base de datos.',
            error_detallado: error.message
        });
    }
};

module.exports = {
    runDBScript
};
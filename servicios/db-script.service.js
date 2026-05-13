const fs = require('fs').promises; // Usamos la versión de promesas para no bloquear el servidor
const path = require('path');
const { sequelize } = require('../database/connection');

// Nota: Asegúrate de que esta ruta apunte correctamente a tu carpeta 'database' 
// dependiendo de dónde ubiques este archivo de servicio.
const SCRIPT_PATH = path.join(__dirname, '..', 'database', 'plataforma_db.sql');

const ejecutarScriptBD = async () => {
  console.log(`Intentando leer script en: ${SCRIPT_PATH}`);

  // 1. Verificar que el archivo exista sin bloquear el servidor
  try {
    await fs.access(SCRIPT_PATH);
  } catch (err) {
    console.error(`ERROR: Archivo no encontrado en la ruta: ${SCRIPT_PATH}`);
    // Lanzamos un error personalizado para que el controlador lo atrape
    throw {
      statusCode: 500,
      msg: 'El archivo de script SQL no fue encontrado en el servidor. Revise la ruta.',
      ruta_verificada: SCRIPT_PATH
    };
  }

  // 2. Leer el contenido del script SQL asíncronamente
  const sqlScript = await fs.readFile(SCRIPT_PATH, 'utf-8');

  // 3. Ejecutar el script en la base de datos
  const [results, metadata] = await sequelize.query(sqlScript, {
    type: sequelize.QueryTypes.RAW,
    multiple: true
  });

  console.log('Script SQL ejecutado exitosamente.');

  // Retornamos la metadata para que el controlador pueda contar los comandos
  return metadata;
};

module.exports = {
  ejecutarScriptBD
};
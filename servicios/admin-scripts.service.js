const fs = require('fs').promises;
const path = require('path');
const { Sequelize } = require('sequelize');

// La conexión admin vive en el servicio, encapsulando la lógica de BD
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

const ejecutarScript = async (nombreArchivo, nombreDb) => {
  // 1. Validaciones de negocio
  if (!nombreArchivo) {
    throw { statusCode: 400, msg: 'Debe enviar el nombre del archivo.' };
  }
  if (nombreArchivo.includes('..') || nombreArchivo.includes('/')) {
    throw { statusCode: 403, msg: 'Nombre de archivo no permitido.' };
  }
  if (!nombreDb || !/^[a-zA-Z0-9_]+$/.test(nombreDb)) {
    throw { statusCode: 400, msg: 'Debe enviar un nombreDb válido (solo letras, números y guiones bajos, sin espacios).' };
  }

  // Nota: Asegúrate de que esta ruta coincida con la ubicación de tu carpeta 'services'
  const rutaArchivo = path.join(__dirname, '..', 'uploads', 'plataforma', 'scripts', nombreArchivo);

  try {
    await fs.access(rutaArchivo);
  } catch (err) {
    throw { statusCode: 404, msg: 'El archivo de script no existe.' };
  }

  // 2. Procesamiento del archivo
  let scriptSql = await fs.readFile(rutaArchivo, 'utf8');
  scriptSql = scriptSql.replace(/##NOMBRE_DB##/g, nombreDb);

  // 3. Ejecución en Base de Datos
  await adminSequelize.authenticate();
  await adminSequelize.query(scriptSql);

  return `El script ${nombreArchivo} se ejecutó correctamente para la base de datos: ${nombreDb}.`;
};

const ejecutarScriptMultiDb = async (nombreArchivo, nombresDbs) => {
  // 1. Validaciones
  if (!nombreArchivo || nombreArchivo.includes('..') || nombreArchivo.includes('/')) {
    throw { statusCode: 400, msg: 'Nombre de archivo inválido.' };
  }
  if (!Array.isArray(nombresDbs) || nombresDbs.length === 0) {
    throw { statusCode: 400, msg: 'Debe enviar un arreglo nombresDbs con al menos una base de datos.' };
  }

  const rutaArchivo = path.join(__dirname, '..', 'uploads', 'plataforma', 'scripts', nombreArchivo);
  let scriptBase;

  try {
    scriptBase = await fs.readFile(rutaArchivo, 'utf8');
  } catch (err) {
    throw { statusCode: 404, msg: 'El archivo de script no existe.' };
  }

  // 2. Ejecución Masiva
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

  return resultados;
};

module.exports = {
  ejecutarScript,
  ejecutarScriptMultiDb
};
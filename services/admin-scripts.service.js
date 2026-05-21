/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern & MSSQL Batch Execution
*/
const fs = require('fs').promises;
const path = require('path');
const { Sequelize } = require('sequelize');
const Joi = require('joi');

const ScriptUnicoSchema = Joi.object({
  nombreArchivo: Joi.string().required().messages({
    'any.required': 'Debe enviar el nombre del archivo.',
    'string.empty': 'El nombre del archivo no puede estar vacío.'
  }),
  nombreDb: Joi.string().pattern(/^[a-zA-Z0-9_]+$/).required().messages({
    'string.pattern.base': 'Debe enviar un nombreDb válido (solo letras, números y guiones bajos, sin espacios).',
    'any.required': 'Debe enviar el nombre de la base de datos.'
  })
});

const ScriptMultiSchema = Joi.object({
  nombreArchivo: Joi.string().required().messages({
    'any.required': 'Debe enviar el nombre del archivo.'
  }),
  nombresDbs: Joi.array().items(
    Joi.string().pattern(/^[a-zA-Z0-9_]+$/).messages({
      'string.pattern.base': 'Uno o más nombres de base de datos tienen un formato inválido.'
    })
  ).min(1).required().messages({
    'array.min': 'Debe enviar un arreglo nombresDbs con al menos una base de datos.',
    'any.required': 'El arreglo nombresDbs es obligatorio.'
  })
});

const validarDTO = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw {
      statusCode: 400,
      type: 'ValidationError',
      details: error.details.map(d => ({ campo: d.context.key, mensaje: d.message }))
    };
  }
  return value;
};

const adminSequelize = new Sequelize(process.env.DB_NAME_MASTER, process.env.DB_USER, process.env.DB_PWD, {
  host: process.env.DB_SERVER,
  dialect: 'mssql',
  logging: false,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  }
});

const ejecutarScriptPorLotesMSSQL = async (scriptSql) => {
  const lotes = scriptSql.split(/^\s*GO\s*$/im);

  for (const lote of lotes) {
    const queryLimpio = lote.trim();
    if (queryLimpio.length > 0) {
      await adminSequelize.query(queryLimpio);
    }
  }
};

const obtenerRutaSegura = (nombreArchivo) => {
  const archivoSeguro = path.basename(nombreArchivo);
  return path.join(__dirname, '..', 'uploads', 'plataforma', 'scripts', archivoSeguro);
};

const ejecutarScript = async (rawData) => {
  const { nombreArchivo, nombreDb } = validarDTO(ScriptUnicoSchema, rawData);

  const rutaArchivo = obtenerRutaSegura(nombreArchivo);

  try {
    await fs.access(rutaArchivo);
  } catch (err) {
    throw { statusCode: 404, msg: `El archivo de script '${nombreArchivo}' no existe en el servidor.` };
  }

  let scriptSql = await fs.readFile(rutaArchivo, 'utf8');
  scriptSql = scriptSql.replace(/##NOMBRE_DB##/g, nombreDb);

  await ejecutarScriptPorLotesMSSQL(scriptSql);

  return `El script ${nombreArchivo} se ejecutó correctamente para la base de datos: ${nombreDb}.`;
};

const ejecutarScriptMultiDb = async (rawData) => {
  const { nombreArchivo, nombresDbs } = validarDTO(ScriptMultiSchema, rawData);

  const rutaArchivo = obtenerRutaSegura(nombreArchivo);
  let scriptBase;

  try {
    scriptBase = await fs.readFile(rutaArchivo, 'utf8');
  } catch (err) {
    throw { statusCode: 404, msg: `El archivo de script '${nombreArchivo}' no existe.` };
  }

  const resultados = {
    exitosos: [],
    fallidos: []
  };

  for (const dbName of nombresDbs) {
    try {
      const scriptAEjecutar = scriptBase.replace(/##NOMBRE_DB##/g, dbName);
      await ejecutarScriptPorLotesMSSQL(scriptAEjecutar);
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
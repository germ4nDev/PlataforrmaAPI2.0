/*
    Author: German Valencia
*/
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const FOLDER_MAP = {
  //PLATAFORMA
  'aplicaciones': path.join('plataforma', 'aplicaciones'),
  'sitios': path.join('plataforma', 'sitios'),
  'sliders': path.join('plataforma', 'sliders'),
  'suites': path.join('plataforma', 'suites'),
  'suscriptores': path.join('plataforma', 'suscriptores'),
  'usuarios': path.join('plataforma', 'usuarios'),
  'media': path.join('content', 'uploads', 'images'),
  // SUSCRIPTOR
  'tickets': path.join('tickets', 'tickets'),
  'requerimientos': path.join('tickets', 'requerimientos'),
  'seguimientos': path.join('tickets', 'seguimientos'),
};

const tiposValidos = Object.keys(FOLDER_MAP);

const moveFilePromise = (file, pathAbsoluto) => {
  return new Promise((resolve, reject) => {
    // file.mv es el método de express-fileupload para mover el archivo.
    file.mv(pathAbsoluto, (err) => {
      if (err) {
        // Console.error aquí es útil para debug.
        console.error("Error moviendo archivo:", err);
        return reject(err);
      }
      resolve();
    });
  });
};

// =================================================================
// MÉTODO DE CARGA DE ARCHIVO (fileUpload)
// =================================================================
const fileUpload = async (req, res = response) => {
  const { susc, tipo, id } = req.params;
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: `Tipo no válido: '${tipo}'. Los tipos permitidos son: ${tiposValidos.join(', ')}`,
    });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No se ha subido ningún archivo. Se esperaba el campo 'foto'.",
    });
  }
  const file = req.files.file;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];
  const relativePath = FOLDER_MAP[tipo];
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
  const pathAbsoluto = path.join(
    __dirname,
    '..',
    'uploads',
    susc,
    relativePath,
    nombreArchivo
  );
  const directorioDestino = path.dirname(pathAbsoluto);
  try {
    await fs.promises.mkdir(directorioDestino, { recursive: true });
    await moveFilePromise(file, pathAbsoluto);

    res.json({
      ok: true,
      msg: "Archivo cargado exitosamente",
      nombreArchivo,
      pathGuardado: pathAbsoluto
    });
  } catch (err) {
    console.error('Error durante la carga o movimiento del archivo:', err);
    return res.status(500).json({
      ok: false,
      msg: "Error al cargar/mover el archivo al servidor",
      error: err.message
    });
  }
};

// =================================================================
// MÉTODO DE LECTURA DE IMAGEN (retornaImagen)
// =================================================================
const retornaImagen = (req, res = response) => {
  const { susc, tipo, foto } = req.params;
  if (!susc || !tipo || !foto) {
    console.error("ERROR 400: Parámetro de ruta faltante.");
    return res.status(400).send('Parámetro de ruta faltante.');
  }
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).send(`Tipo de carpeta no válido: ${tipo}.`);
  }
  const relativePath = FOLDER_MAP[tipo];
  const pathImg = path.join(
    __dirname,
    '..',
    'uploads',
    susc,
    relativePath,
    foto
  );
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathNoImg = path.join(__dirname, '..', 'uploads', 'no-imagen.png');
    if (fs.existsSync(pathNoImg)) {
      res.sendFile(pathNoImg);
    } else {
      console.error("ERROR 404: No se encontró la imagen solicitada y tampoco el fallback 'no-imagen.png'");
      res.status(404).send('Archivo no encontrado.');
    }
  }
};

// =================================================================
// MÉTODO DE ELIMINACIÓN DE ARCHIVO (eliminarArchivo)
// =================================================================
const eliminarArchivo = async (req, res = response) => {
  const { susc, tipo, foto: fileName } = req.params;

  if (!susc || !tipo || !fileName) {
    return res.status(400).json({
      ok: false,
      msg: 'Faltan parámetros esenciales (susc, tipo, o foto).'
    });
  }

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: `Tipo de carpeta no válido para eliminación: ${tipo}.`
    });
  }

  const relativePath = FOLDER_MAP[tipo];

  const pathFile = path.join(
    __dirname,
    '..',
    'uploads',
    susc,
    relativePath,
    fileName
  );

  try {
    // SOLUCIÓN: Usamos fs.promises.stat y fs.promises.unlink explícitamente.
    await fs.promises.stat(pathFile);
    await fs.promises.unlink(pathFile);

    return res.json({
      ok: true,
      msg: `Archivo ${fileName} eliminado de la ruta: ${relativePath}`
    });

  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({
        ok: false,
        msg: `Archivo ${fileName} no encontrado en la ruta: ${pathFile}`
      });
    }

    return res.status(500).json({
      ok: false,
      msg: `No se pudo eliminar el archivo ${fileName}.`,
      error: error.message
    });
  }
};

// =================================================================
// MÉTODO DE CREACION CARPETA SUSCRIPTOR (setUploadFolder)
// =================================================================
const setUploadFolder = async (req, res = response) => {
  const { susc } = req.params;
  const pathAbsoluto = path.join(
    __dirname,
    '..',
    'uploads',
    susc
  );
  const directorioDestino = path.dirname(pathAbsoluto);
  try {
    await fs.promises.mkdir(directorioDestino, { recursive: true });
    await moveFilePromise(file, pathAbsoluto);

    res.json({
      ok: true,
      msg: "Carpeta creado exitosamente",
      susc,
      pathGuardado: pathAbsoluto
    });
  } catch (err) {
    console.error('Error durante la creacion de la carpeta del suscriptor:', err);
    return res.status(500).json({
      ok: false,
      msg: "Error al crear/mover la carpeta del suscriptor",
      error: err.message
    });
  }
};

module.exports = {
  fileUpload,
  retornaImagen,
  eliminarArchivo,
  setUploadFolder,
};
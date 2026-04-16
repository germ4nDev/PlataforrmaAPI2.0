const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const FOLDER_MAP = {
  //PLATAFORMA
  'aplicaciones': path.join('aplicaciones'),
  'sitios': path.join('sitios'),
  'sliders': path.join('sliders'),
  'suites': path.join('suites'),
  'suscriptores': path.join('suscriptores'),
  'usuarios': path.join('usuarios'),  // SUSCRIPTOR
  'biblioteca': path.join('biblioteca', 'biblioteca'),  // biblioteca
  'galeria': path.join('galeria'), // galeria
  'galeria-img': path.join('biblioteca', 'galeria', 'imagenes'),  // imagenes
  'galeria-vid': path.join('biblioteca', 'galeria', 'videos'),  // videos
  'galeria-doc': path.join('biblioteca', 'galeria', 'documentos'),  // documentos
  // WEBSITES
  'qplus10': path.join('websites', 'qplus10'),
  'qplus10carrusel': path.join('websites', 'qplus10', 'carrusel-inicio'),
  'qplus10clientes': path.join('websites', 'qplus10', 'clientes'),
  // SUSCRIPTOR
  'tickets': path.join('tickets', 'tickets'),
  'requerimientos': path.join('tickets', 'requerimientos'),
  'seguimientos': path.join('tickets', 'seguimientos'),
};

const tiposValidos = ['usuarios', 'biblioteca', 'aplicaciones', 'galeria'];

// =================================================================
// UTILIDAD QUE EJECUTA EL MOVIMIENTO DEL ARCHIVO A LA CARPETA
// =================================================================
const moveFilePromise = (file, pathAbsoluto) => {
  return new Promise((resolve, reject) => {
    file.mv(pathAbsoluto, (err) => {
      if (err) {
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

  // 1. Validaciones iniciales
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: `Tipo no válido: '${tipo}'. Los tipos permitidos son: ${tiposValidos.join(', ')}`,
    });
  }

  // Revisamos si el campo 'file' existe. Es importante que en Angular uses 'file' como nombre del campo
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      ok: false,
      msg: "No se ha subido ningún archivo. Se esperaba el campo 'file'.",
    });
  }

  const file = req.files.file;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];
  const relativePath = FOLDER_MAP[tipo];
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // 2. Construcción del path de destino
  const directorioDestino = path.join(
    __dirname,
    '..',
    'uploads',
    susc,
    relativePath
  );

  const pathAbsoluto = path.join(directorioDestino, nombreArchivo);

  try {
    // 3. Creación recursiva del directorio
    await fs.promises.mkdir(directorioDestino, { recursive: true });

    // 4. Mover el archivo
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
// MÉTODO DE CREA LAS CARPETAS EN UPLOADS (folderUpload)
// =================================================================
const folderUpload = async (req, res = response) => {
  const { susc } = req.params;
  const directorioDestino = path.join(
    __dirname,
    '..',
    'uploads',
    susc
  );
  try {
    await fs.promises.mkdir(directorioDestino, { recursive: true });
    res.json({
      ok: true,
      msg: "Carpeta creada exitosamente",
      folder: susc,
      pathGuardado: pathAbsoluto
    });
  } catch (err) {
    console.error('Error durante la creacion de la carpeta:', err);
    return res.status(500).json({
      ok: false,
      msg: "Error al crear de la carpeta",
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
    // Fallback: Si no hay imagen, intenta enviar la imagen de no-imagen física
    const pathNoImg = path.join(__dirname, '..', 'uploads', 'no-imagen.png');
    if (fs.existsSync(pathNoImg)) {
      res.sendFile(pathNoImg);
    } else {
      // --- ¡AQUÍ ESTÁ LA MAGIA! ---
      // Si ni el archivo ni el fallback existen, Node.js genera una imagen virtual en tiempo real
      // y la envía como un gráfico (SVG) con un color de fondo que hace match con tu tema oscuro
      const svgVirtual = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
          <rect width="300" height="200" fill="#2c3136"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="18" fill="#888888">Sin Archivo</text>
        </svg>
      `;
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.status(200).send(svgVirtual);
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
    // Verificamos si existe y luego eliminamos
    await fs.promises.stat(pathFile); // stat lanzará un error si no existe
    await fs.promises.unlink(pathFile); // Elimina el archivo

    return res.json({
      ok: true,
      msg: `Archivo ${fileName} eliminado de la ruta: ${relativePath}`
    });

  } catch (error) {
    if (error.code === 'ENOENT') {
      // El archivo no existía, lo tratamos como una eliminación exitosa o un 404
      return res.status(404).json({
        ok: false,
        msg: `Archivo ${fileName} no encontrado en la ruta, no se pudo eliminar.`,
        error: 'ENOENT'
      });
    }

    return res.status(500).json({
      ok: false,
      msg: `No se pudo eliminar el archivo ${fileName}.`,
      error: error.message
    });
  }
};

module.exports = {
  fileUpload,
  folderUpload,
  retornaImagen,
  eliminarArchivo,
};
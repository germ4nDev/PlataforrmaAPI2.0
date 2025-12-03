// /*
//     Author: German Valencia
// */
// const path = require("path");
// const fs = require("fs");
// const { response } = require("express");
// const { v4: uuidv4 } = require("uuid");

// const FOLDER_MAP = {
//   //PLATAFORMA
//   'aplicaciones': path.join('plataforma', 'aplicaciones'),
//   'sitios': path.join('plataforma', 'sitios'),
//   'sliders': path.join('plataforma', 'sliders'),
//   'suites': path.join('plataforma', 'suites'),
//   'suscriptores': path.join('plataforma', 'suscriptores'),
//   'usuarios': path.join('plataforma', 'usuarios'),
//   'media': path.join('content', 'uploads', 'images'),
//   // SUSCRIPTOR
//   'tickets': path.join('tickets', 'tickets'),
//   'requerimientos': path.join('tickets', 'requerimientos'),
//   'seguimientos': path.join('tickets', 'seguimientos'),
// };

// const tiposValidos = Object.keys(FOLDER_MAP);

// const moveFilePromise = (file, pathAbsoluto) => {
//   return new Promise((resolve, reject) => {
//     // file.mv es el método de express-fileupload para mover el archivo.
//     file.mv(pathAbsoluto, (err) => {
//       if (err) {
//         // Console.error aquí es útil para debug.
//         console.error("Error moviendo archivo:", err);
//         return reject(err);
//       }
//       resolve();
//     });
//   });
// };

// // =================================================================
// // MÉTODO DE CARGA DE ARCHIVO (fileUpload)
// // =================================================================
// const fileUpload = async (req, res = response) => {
//   const { susc, tipo, id } = req.params;
//   if (!tiposValidos.includes(tipo)) {
//     return res.status(400).json({
//       ok: false,
//       msg: `Tipo no válido: '${tipo}'. Los tipos permitidos son: ${tiposValidos.join(', ')}`,
//     });
//   }
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).json({
//       ok: false,
//       msg: "No se ha subido ningún archivo. Se esperaba el campo 'foto'.",
//     });
//   }
//   const file = req.files.file;
//   const nombreCortado = file.name.split(".");
//   const extensionArchivo = nombreCortado[nombreCortado.length - 1];
//   const relativePath = FOLDER_MAP[tipo];
//   const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
//   const pathAbsoluto = path.join(
//     __dirname,
//     '..',
//     'uploads',
//     susc,
//     relativePath,
//     nombreArchivo
//   );
//   const directorioDestino = path.dirname(pathAbsoluto);
//   try {
//     await fs.promises.mkdir(directorioDestino, { recursive: true });
//     await moveFilePromise(file, pathAbsoluto);

//     res.json({
//       ok: true,
//       msg: "Archivo cargado exitosamente",
//       nombreArchivo,
//       pathGuardado: pathAbsoluto
//     });
//   } catch (err) {
//     console.error('Error durante la carga o movimiento del archivo:', err);
//     return res.status(500).json({
//       ok: false,
//       msg: "Error al cargar/mover el archivo al servidor",
//       error: err.message
//     });
//   }
// };

// // =================================================================
// // MÉTODO DE LECTURA DE IMAGEN (retornaImagen)
// // =================================================================
// const retornaImagen = (req, res = response) => {
//   const { susc, tipo, foto } = req.params;
//   if (!susc || !tipo || !foto) {
//     console.error("ERROR 400: Parámetro de ruta faltante.");
//     return res.status(400).send('Parámetro de ruta faltante.');
//   }
//   if (!tiposValidos.includes(tipo)) {
//     return res.status(400).send(`Tipo de carpeta no válido: ${tipo}.`);
//   }
//   const relativePath = FOLDER_MAP[tipo];
//   const pathImg = path.join(
//     __dirname,
//     '..',
//     'uploads',
//     susc,
//     relativePath,
//     foto
//   );
//   if (fs.existsSync(pathImg)) {
//     res.sendFile(pathImg);
//   } else {
//     const pathNoImg = path.join(__dirname, '..', 'uploads', 'no-imagen.png');
//     if (fs.existsSync(pathNoImg)) {
//       res.sendFile(pathNoImg);
//     } else {
//       console.error("ERROR 404: No se encontró la imagen solicitada y tampoco el fallback 'no-imagen.png'");
//       res.status(404).send('Archivo no encontrado.');
//     }
//   }
// };

// // =================================================================
// // MÉTODO DE ELIMINACIÓN DE ARCHIVO (eliminarArchivo)
// // =================================================================
// const eliminarArchivo = async (req, res = response) => {
//   const { susc, tipo, foto: fileName } = req.params;

//   if (!susc || !tipo || !fileName) {
//     return res.status(400).json({
//       ok: false,
//       msg: 'Faltan parámetros esenciales (susc, tipo, o foto).'
//     });
//   }

//   if (!tiposValidos.includes(tipo)) {
//     return res.status(400).json({
//       ok: false,
//       msg: `Tipo de carpeta no válido para eliminación: ${tipo}.`
//     });
//   }

//   const relativePath = FOLDER_MAP[tipo];

//   const pathFile = path.join(
//     __dirname,
//     '..',
//     'uploads',
//     susc,
//     relativePath,
//     fileName
//   );

//   try {
//     // SOLUCIÓN: Usamos fs.promises.stat y fs.promises.unlink explícitamente.
//     await fs.promises.stat(pathFile);
//     await fs.promises.unlink(pathFile);

//     return res.json({
//       ok: true,
//       msg: `Archivo ${fileName} eliminado de la ruta: ${relativePath}`
//     });

//   } catch (error) {
//     if (error.code === 'ENOENT') {
//       return res.status(404).json({
//         ok: false,
//         msg: `Archivo ${fileName} no encontrado en la ruta: ${pathFile}`
//       });
//     }

//     return res.status(500).json({
//       ok: false,
//       msg: `No se pudo eliminar el archivo ${fileName}.`,
//       error: error.message
//     });
//   }
// };

// // =================================================================
// // MÉTODO DE CREACION CARPETA SUSCRIPTOR (setUploadFolder)
// // =================================================================
// const setUploadFolder = async (req, res = response) => {
//   const { susc } = req.params;
//   const pathAbsoluto = path.join(
//     __dirname,
//     '..',
//     'uploads',
//     susc
//   );
//   const directorioDestino = path.dirname(pathAbsoluto);
//   try {
//     await fs.promises.mkdir(directorioDestino, { recursive: true });
//     await moveFilePromise(file, pathAbsoluto);

//     res.json({
//       ok: true,
//       msg: "Carpeta creado exitosamente",
//       susc,
//       pathGuardado: pathAbsoluto
//     });
//   } catch (err) {
//     console.error('Error durante la creacion de la carpeta del suscriptor:', err);
//     return res.status(500).json({
//       ok: false,
//       msg: "Error al crear/mover la carpeta del suscriptor",
//       error: err.message
//     });
//   }
// };

// module.exports = {
//   fileUpload,
//   retornaImagen,
//   eliminarArchivo,
//   setUploadFolder,
// };

/*
    Author: German Valencia
*/
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

// NOTA: Se ha añadido el uso de la carpeta 'uploads' directamente en el mapa
// para construir el path de manera más eficiente y limpia en cada función.
// Sin embargo, por cómo estás construyendo el path en las funciones, 
// mantendremos la estructura original de FOLDER_MAP.
const FOLDER_MAP = {
  //PLATAFORMA
  'aplicaciones': path.join('plataforma', 'aplicaciones'),
  'sitios': path.join('plataforma', 'sitios'),
  'sliders': path.join('plataforma', 'sliders'),
  'suites': path.join('plataforma', 'suites'),
  'suscriptores': path.join('plataforma', 'suscriptores'),
  'usuarios': path.join('plataforma', 'usuarios'),
  'qplus10': path.join('websites', 'qplus10'),
  'qplus10carrusel': path.join('websites', 'qplus10', 'carrusel-inicio'),
  // SUSCRIPTOR
  'tickets': path.join('tickets', 'tickets'),
  'requerimientos': path.join('tickets', 'requerimientos'),
  'seguimientos': path.join('tickets', 'seguimientos'),
};

const tiposValidos = Object.keys(FOLDER_MAP);

// Esta función es correcta para envolver file.mv en una Promise
const moveFilePromise = (file, pathAbsoluto) => {
  return new Promise((resolve, reject) => {
    // file.mv es el método de express-fileupload para mover el archivo.
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
  // Se quita 'path.dirname(pathAbsoluto)' y se usa 'path.join' hasta el directorio para fs.mkdir
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
    // Esto resuelve el error si la carpeta del suscriptor o el tipo no existen.
    await fs.promises.mkdir(directorioDestino, { recursive: true });
    
    // 4. Mover el archivo
    await moveFilePromise(file, pathAbsoluto);

    // TODO: Aquí deberías guardar el nombreArchivo y el id en tu base de datos (e.g., actualizar el usuario)
    
    res.json({
      ok: true,
      msg: "Archivo cargado exitosamente",
      nombreArchivo,
      pathGuardado: pathAbsoluto // Solo para debug, no devolver path absoluto en producción
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
    // Fallback: Si no hay imagen, intenta enviar la imagen de no-imagen
    const pathNoImg = path.join(__dirname, '..', 'uploads', 'no-imagen.png');
    if (fs.existsSync(pathNoImg)) {
      res.sendFile(pathNoImg);
    } else {
      console.error("ERROR 404: No se encontró la imagen solicitada y tampoco el fallback 'no-imagen.png'");
      // Si ni siquiera el fallback existe, enviamos un 404 simple
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
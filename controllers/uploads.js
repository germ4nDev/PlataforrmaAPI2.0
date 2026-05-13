// const path = require("path");
// const fs = require("fs");
// const { response } = require("express");
// const { v4: uuidv4 } = require("uuid");

// const FOLDER_MAP = {
//     //PLATAFORMA
//     'aplicaciones': path.join('aplicaciones'),
//     'biblioteca': path.join('biblioteca', 'biblioteca'),
//     'idiomas': path.join('idiomas'),
//     'scripts': path.join('scripts'),
//     'sitios': path.join('sitios'),
//     'sliders': path.join('sliders'),
//     'suscriptores': path.join('suscriptores'),
//     'suites': path.join('aplicaciones', 'suites'),
//     'usuarios': path.join('usuarios'),
//     'galeria': path.join('biblioteca', 'galerias'),
//     'galeria-img': path.join('biblioteca', 'galerias', 'imagenes'),
//     'galeria-vid': path.join('biblioteca', 'galerias', 'videos'),
//     'galeria-doc': path.join('biblioteca', 'galerias', 'documentos'),
//     // WEBSITES
//     'qplus10': path.join('websites', 'qplus10'),
//     'qplus10carrusel': path.join('websites', 'qplus10', 'carrusel-inicio'),
//     'qplus10clientes': path.join('websites', 'qplus10', 'clientes'),
//     // SUSCRIPTOR
//     'tickets': path.join('tickets', 'tickets'),
//     'requerimientos': path.join('tickets', 'requerimientos'),
//     'seguimientos': path.join('tickets', 'seguimientos'),
// };

// const tiposValidos = Object.keys(FOLDER_MAP);

// // Esta función es correcta para envolver file.mv en una Promise
// const moveFilePromise = (file, pathAbsoluto) => {
//     return new Promise((resolve, reject) => {
//         // file.mv es el método de express-fileupload para mover el archivo.
//         file.mv(pathAbsoluto, (err) => {
//             if (err) {
//                 console.error("Error moviendo archivo:", err);
//                 return reject(err);
//             }
//             resolve();
//         });
//     });
// };

// // =================================================================
// // MÉTODO DE CARGA DE ARCHIVO (fileUpload)
// // =================================================================
// const fileUpload = async(req, res = response) => {
//     const { susc, tipo, id } = req.params;

//     // 1. Validaciones iniciales
//     if (!tiposValidos.includes(tipo)) {
//         return res.status(400).json({
//             ok: false,
//             msg: `Tipo no válido: '${tipo}'. Los tipos permitidos son: ${tiposValidos.join(', ')}`,
//         });
//     }

//     // Revisamos si el campo 'file' existe. Es importante que en Angular uses 'file' como nombre del campo
//     if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
//         return res.status(400).json({
//             ok: false,
//             msg: "No se ha subido ningún archivo. Se esperaba el campo 'file'.",
//         });
//     }

//     const file = req.files.file;
//     const nombreCortado = file.name.split(".");
//     const extensionArchivo = nombreCortado[nombreCortado.length - 1];
//     const relativePath = FOLDER_MAP[tipo];
//     const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

//     // 2. Construcción del path de destino
//     // Se quita 'path.dirname(pathAbsoluto)' y se usa 'path.join' hasta el directorio para fs.mkdir
//     const directorioDestino = path.join(
//         __dirname,
//         '..',
//         'uploads',
//         susc,
//         relativePath
//     );

//     const pathAbsoluto = path.join(directorioDestino, nombreArchivo);

//     try {
//         // 3. Creación recursiva del directorio
//         // Esto resuelve el error si la carpeta del suscriptor o el tipo no existen.
//         await fs.promises.mkdir(directorioDestino, { recursive: true });

//         // 4. Mover el archivo
//         await moveFilePromise(file, pathAbsoluto);

//         // TODO: Aquí deberías guardar el nombreArchivo y el id en tu base de datos (e.g., actualizar el usuario)

//         res.json({
//             ok: true,
//             msg: "Archivo cargado exitosamente",
//             nombreArchivo,
//             pathGuardado: pathAbsoluto // Solo para debug, no devolver path absoluto en producción
//         });
//     } catch (err) {
//         console.error('Error durante la carga o movimiento del archivo:', err);
//         return res.status(500).json({
//             ok: false,
//             msg: "Error al cargar/mover el archivo al servidor",
//             error: err.message
//         });
//     }
// };

// // =================================================================
// // MÉTODO DE CREA LAS CARPETAS EN UPLOADS (folderUpload)
// // =================================================================
// const folderUpload = async(req, res = response) => {
//     const { susc } = req.params;
//     const directorioDestino = path.join(
//         __dirname,
//         '..',
//         'uploads',
//         susc
//     );
//     try {
//         await fs.promises.mkdir(directorioDestino, { recursive: true });
//         res.json({
//             ok: true,
//             msg: "Carpeta creada exitosamente",
//             folder: susc,
//             pathGuardado: pathAbsoluto
//         });
//     } catch (err) {
//         console.error('Error durante la creacion de la carpeta:', err);
//         return res.status(500).json({
//             ok: false,
//             msg: "Error al crear de la carpeta",
//             error: err.message
//         });
//     }
// };

// // =================================================================
// // MÉTODO DE LECTURA DE IMAGEN (retornaImagen)
// // =================================================================
// const retornaImagen = (req, res = response) => {
//     const { susc, tipo, foto } = req.params;
//     if (!susc || !tipo || !foto) {
//         console.error("ERROR 400: Parámetro de ruta faltante.");
//         return res.status(400).send('Parámetro de ruta faltante.');
//     }
//     if (!tiposValidos.includes(tipo)) {
//         return res.status(400).send(`Tipo de carpeta no válido: ${tipo}.`);
//     }
//     const relativePath = FOLDER_MAP[tipo];
//     const pathImg = path.join(
//         __dirname,
//         '..',
//         'uploads',
//         susc,
//         relativePath,
//         foto
//     );
//     if (fs.existsSync(pathImg)) {
//         res.sendFile(pathImg);
//     } else {
//         // Fallback: Si no hay imagen, intenta enviar la imagen de no-imagen
//         const pathNoImg = path.join(__dirname, '..', 'uploads', 'no-imagen.png');
//         if (fs.existsSync(pathNoImg)) {
//             res.sendFile(pathNoImg);
//         } else {
//             console.error("ERROR 404: No se encontró la imagen solicitada y tampoco el fallback 'no-imagen.png'");
//             // Si ni siquiera el fallback existe, enviamos un 404 simple
//             res.status(404).send('Archivo no encontrado.');
//         }
//     }
// };

// // =================================================================
// // MÉTODO DE ELIMINACIÓN DE ARCHIVO (eliminarArchivo)
// // =================================================================
// const eliminarArchivo = async(req, res = response) => {
//     const { susc, tipo, foto: fileName } = req.params;

//     if (!susc || !tipo || !fileName) {
//         return res.status(400).json({
//             ok: false,
//             msg: 'Faltan parámetros esenciales (susc, tipo, o foto).'
//         });
//     }

//     if (!tiposValidos.includes(tipo)) {
//         return res.status(400).json({
//             ok: false,
//             msg: `Tipo de carpeta no válido para eliminación: ${tipo}.`
//         });
//     }

//     const relativePath = FOLDER_MAP[tipo];

//     const pathFile = path.join(
//         __dirname,
//         '..',
//         'uploads',
//         susc,
//         relativePath,
//         fileName
//     );

//     try {
//         // Verificamos si existe y luego eliminamos
//         await fs.promises.stat(pathFile); // stat lanzará un error si no existe
//         await fs.promises.unlink(pathFile); // Elimina el archivo

//         return res.json({
//             ok: true,
//             msg: `Archivo ${fileName} eliminado de la ruta: ${relativePath}`
//         });

//     } catch (error) {
//         if (error.code === 'ENOENT') {
//             // El archivo no existía, lo tratamos como una eliminación exitosa o un 404
//             return res.status(404).json({
//                 ok: false,
//                 msg: `Archivo ${fileName} no encontrado en la ruta, no se pudo eliminar.`,
//                 error: 'ENOENT'
//             });
//         }

//         return res.status(500).json({
//             ok: false,
//             msg: `No se pudo eliminar el archivo ${fileName}.`,
//             error: error.message
//         });
//     }
// };

// module.exports = {
//     fileUpload,
//     folderUpload,
//     retornaImagen,
//     eliminarArchivo,
// };

/*
    Author: German Valencia
*/
const { response } = require("express");
const uploadsService = require("../services/uploads.service"); // Ajusta la ruta a tu proyecto

const fileUpload = async (req, res = response) => {
    const { susc, tipo, id } = req.params;

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            ok: false,
            msg: "No se ha subido ningún archivo. Se esperaba el campo 'file'.",
        });
    }

    try {
        const nombreArchivo = await uploadsService.subirArchivo(req.files.file, susc, tipo);

        // TODO: Aquí deberías guardar el nombreArchivo y el id en tu base de datos 

        return res.status(200).json({
            ok: true,
            msg: "Archivo cargado exitosamente",
            nombreArchivo,
            // pathAbsoluto removido por seguridad en producción
        });
    } catch (err) {
        console.error('Error durante la carga o movimiento del archivo:', err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({ ok: false, msg: err.msg });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error al cargar/mover el archivo al servidor",
            error: err.message
        });
    }
};

const folderUpload = async (req, res = response) => {
    const { susc } = req.params;

    try {
        await uploadsService.crearCarpeta(susc);

        return res.status(200).json({
            ok: true,
            msg: "Carpeta creada exitosamente",
            folder: susc,
            // Corregido: La variable pathAbsoluto no existía aquí y tumbaba el servidor
        });
    } catch (err) {
        console.error('Error durante la creación de la carpeta:', err);
        return res.status(500).json({
            ok: false,
            msg: "Error al crear la carpeta",
            error: err.message
        });
    }
};

const retornaImagen = (req, res = response) => {
    const { susc, tipo, foto } = req.params;

    if (!susc || !tipo || !foto) {
        console.error("ERROR 400: Parámetro de ruta faltante.");
        return res.status(400).send('Parámetro de ruta faltante.');
    }

    try {
        // Obtenemos la ruta absoluta de la imagen (o del fallback)
        const rutaImagen = uploadsService.obtenerRutaImagen(susc, tipo, foto);
        return res.sendFile(rutaImagen);
    } catch (err) {
        console.error(`ERROR ${err.statusCode}: ${err.msg}`);
        const status = err.statusCode || 500;
        return res.status(status).send(err.msg || 'Error interno del servidor.');
    }
};

const eliminarArchivo = async (req, res = response) => {
    const { susc, tipo, foto: fileName } = req.params;

    if (!susc || !tipo || !fileName) {
        return res.status(400).json({
            ok: false,
            msg: 'Faltan parámetros esenciales (susc, tipo, o foto).'
        });
    }

    try {
        const relativePath = await uploadsService.borrarArchivo(susc, tipo, fileName);

        return res.status(200).json({
            ok: true,
            msg: `Archivo ${fileName} eliminado de la ruta: ${relativePath}`
        });
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            return res.status(err.statusCode).json({
                ok: false,
                msg: err.msg,
                error: err.error
            });
        }
        return res.status(500).json({
            ok: false,
            msg: `No se pudo eliminar el archivo ${fileName}.`,
            error: err.message
        });
    }
};

module.exports = {
    fileUpload,
    folderUpload,
    retornaImagen,
    eliminarArchivo,
};
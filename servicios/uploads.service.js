const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const FOLDER_MAP = {
  //PLATAFORMA
  'aplicaciones': path.join('aplicaciones'),
  'biblioteca': path.join('biblioteca', 'biblioteca'),
  'idiomas': path.join('idiomas'),
  'scripts': path.join('scripts'),
  'sitios': path.join('sitios'),
  'sliders': path.join('sliders'),
  'suscriptores': path.join('suscriptores'),
  'suites': path.join('aplicaciones', 'suites'),
  'usuarios': path.join('usuarios'),
  'galeria': path.join('biblioteca', 'galerias'),
  'galeria-img': path.join('biblioteca', 'galerias', 'imagenes'),
  'galeria-vid': path.join('biblioteca', 'galerias', 'videos'),
  'galeria-doc': path.join('biblioteca', 'galerias', 'documentos'),
  // WEBSITES
  'qplus10': path.join('websites', 'qplus10'),
  'qplus10carrusel': path.join('websites', 'qplus10', 'carrusel-inicio'),
  'qplus10clientes': path.join('websites', 'qplus10', 'clientes'),
  // SUSCRIPTOR
  'tickets': path.join('tickets', 'tickets'),
  'requerimientos': path.join('tickets', 'requerimientos'),
  'seguimientos': path.join('tickets', 'seguimientos'),
};

const tiposValidos = Object.keys(FOLDER_MAP);

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

const subirArchivo = async (file, susc, tipo) => {
  if (!tiposValidos.includes(tipo)) {
    throw { statusCode: 400, msg: `Tipo no válido: '${tipo}'. Los tipos permitidos son: ${tiposValidos.join(', ')}` };
  }

  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];
  const relativePath = FOLDER_MAP[tipo];
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  const directorioDestino = path.join(__dirname, '..', 'uploads', susc, relativePath);
  const pathAbsoluto = path.join(directorioDestino, nombreArchivo);

  await fs.promises.mkdir(directorioDestino, { recursive: true });
  await moveFilePromise(file, pathAbsoluto);

  return nombreArchivo;
};

const crearCarpeta = async (susc) => {
  const directorioDestino = path.join(__dirname, '..', 'uploads', susc);
  await fs.promises.mkdir(directorioDestino, { recursive: true });
  return directorioDestino;
};

const obtenerRutaImagen = (susc, tipo, foto) => {
  if (!tiposValidos.includes(tipo)) {
    throw { statusCode: 400, msg: `Tipo de carpeta no válido: ${tipo}.` };
  }

  const relativePath = FOLDER_MAP[tipo];
  const pathImg = path.join(__dirname, '..', 'uploads', susc, relativePath, foto);

  if (fs.existsSync(pathImg)) {
    return pathImg;
  }

  // Fallback: Si no hay imagen, intenta enviar la imagen de no-imagen
  const pathNoImg = path.join(__dirname, '..', 'uploads', 'no-imagen.png');
  if (fs.existsSync(pathNoImg)) {
    return pathNoImg;
  }

  // Si ni siquiera el fallback existe
  throw { statusCode: 404, msg: 'Archivo no encontrado.' };
};

const borrarArchivo = async (susc, tipo, fileName) => {
  if (!tiposValidos.includes(tipo)) {
    throw { statusCode: 400, msg: `Tipo de carpeta no válido para eliminación: ${tipo}.` };
  }

  const relativePath = FOLDER_MAP[tipo];
  const pathFile = path.join(__dirname, '..', 'uploads', susc, relativePath, fileName);

  try {
    await fs.promises.stat(pathFile);
    await fs.promises.unlink(pathFile);
    return relativePath; // Retornamos la ruta relativa para el mensaje de éxito
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw { statusCode: 404, msg: `Archivo ${fileName} no encontrado en la ruta, no se pudo eliminar.`, error: 'ENOENT' };
    }
    throw { statusCode: 500, msg: `No se pudo eliminar el archivo ${fileName}.`, error: error.message };
  }
};

module.exports = {
  subirArchivo,
  crearCarpeta,
  obtenerRutaImagen,
  borrarArchivo
};
/*
    Author: German Valencia
    Refactored for: QPLUS Architecture Pattern & File System Management
*/
const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");
const { v4: uuidv4 } = require("uuid");

class UploadsService {
  constructor() {
    this.baseUploadPath = path.join(__dirname, '..', 'uploads');
    this.folderMap = {
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
      'qplus10': path.join('websites', 'qplus10'),
      'qplus10carrusel': path.join('websites', 'qplus10', 'carrusel-inicio'),
      'qplus10clientes': path.join('websites', 'qplus10', 'clientes'),
      'tickets': path.join('tickets', 'tickets'),
      'requerimientos': path.join('tickets', 'requerimientos'),
      'seguimientos': path.join('tickets', 'seguimientos'),
    };
    this.validTypes = Object.keys(this.folderMap);
  }

  validateType(type) {
    if (!this.validTypes.includes(type)) {
      throw {
        statusCode: 400,
        msg: `Tipo no válido: '${type}'. Tipos permitidos: ${this.validTypes.join(', ')}`
      };
    }
  }

  async uploadFile(file, suscriptorId, type) {
    this.validateType(type);

    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuidv4()}.${fileExtension}`;
    const relativeFolder = this.folderMap[type];

    const targetDirectory = path.join(this.baseUploadPath, suscriptorId.toString(), relativeFolder);
    const absolutePath = path.join(targetDirectory, newFileName);

    await fs.mkdir(targetDirectory, { recursive: true });

    return new Promise((resolve, reject) => {
      file.mv(absolutePath, (err) => {
        if (err) return reject({ statusCode: 500, msg: 'Error al mover el archivo al storage' });
        resolve(newFileName);
      });
    });
  }

  getFilePath(suscriptorId, type, fileName) {
    this.validateType(type);

    const relativeFolder = this.folderMap[type];
    const fullPath = path.join(this.baseUploadPath, suscriptorId.toString(), relativeFolder, fileName);

    if (fsSync.existsSync(fullPath)) {
      return fullPath;
    }

    const noImgPath = path.join(this.baseUploadPath, 'assets', 'no-imagen.png');
    return fsSync.existsSync(noImgPath) ? noImgPath : null;
  }

  async deleteFile(suscriptorId, type, fileName) {
    this.validateType(type);

    const relativeFolder = this.folderMap[type];
    const targetPath = path.join(this.baseUploadPath, suscriptorId.toString(), relativeFolder, fileName);

    try {
      await fs.unlink(targetPath);
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw { statusCode: 404, msg: 'El archivo ya no existe en el servidor' };
      }
      throw { statusCode: 500, msg: 'No se pudo eliminar el recurso físico' };
    }
  }

  async deleteFolderContent(suscriptorId, type) {
    this.validateType(type);

    const relativeFolder = this.folderMap[type];
    const targetDirectory = path.join(this.baseUploadPath, suscriptorId.toString(), relativeFolder);

    try {
      if (fsSync.existsSync(targetDirectory)) {
        const entries = await fs.readdir(targetDirectory, { withFileTypes: true });

        const deletePromises = entries.map(entry => {
          const fullPath = path.join(targetDirectory, entry.name);
          return entry.isDirectory()
            ? fs.rm(fullPath, { recursive: true, force: true })
            : fs.unlink(fullPath);
        });

        await Promise.all(deletePromises);

        console.log(`[FileManager] Contenido de la carpeta '${type}' eliminado para el suscriptor ${suscriptorId}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`[FileManager] Error al limpiar carpeta ${type}:`, error);
      throw { statusCode: 500, msg: `Error interno al limpiar el directorio de ${type}` };
    }
  }

  validateType(type) {
    if (!this.validTypes.includes(type)) {
      throw { statusCode: 400, msg: `Tipo no válido: ${type}` };
    }
  }
}

module.exports = UploadsService;

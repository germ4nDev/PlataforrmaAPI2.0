/*
    Author: German Valencia
*/
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const fileUpload = (req, res = response) => {
  const { susc, tipo, id } = req.params;
  const tiposValidos = [
    "suscriptores",
    "aplicaciones",
    "usuarios",
    "documentos",
    "informes",
    "empresas",
    "adjuntos",
    "sitios",
    "suites",
    "sliders",
    "tickets",
    "seguimientos",
    "firmas"
  ];
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
  const file = req.files.foto;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];
  let rutaInterna = tipo;
  if (tipo === 'seguimientos') {
    rutaInterna = path.join('tickets', 'seguimientos');
  }
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
  const pathAbsoluto = path.join(
    __dirname,
    '..',
    'uploads',
    susc,
    rutaInterna,
    nombreArchivo
  );
  const directorioDestino = path.dirname(pathAbsoluto);
  try {
    if (!fs.existsSync(directorioDestino)) {
      fs.mkdirSync(directorioDestino, { recursive: true });
    }
  } catch (err) {
    console.error('Error al crear el directorio:', err);
    return res.status(500).json({
      ok: false,
      msg: "Error interno al intentar crear el directorio de destino.",
      error: err.message
    });
  }
  file.mv(pathAbsoluto, (err) => {
    if (err) {
      console.error('Error al mover el archivo:', err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover el archivo al servidor",
        error: err.message
      });
    }
    res.json({
      ok: true,
      msg: "Archivo cargado exitosamente",
      nombreArchivo,
      pathGuardado: pathAbsoluto
    });
  });
};

const retornaImagen = (req, res = response) => {
    const { susc, tipo, foto } = req.params;
    if (!susc || !tipo || !foto) {
        console.error("ERROR 400: Parámetro de ruta faltante. Verifique la URL.");
        return res.status(400).send('Parámetro de ruta faltante. Verifique que la URL contenga /susc/tipo/foto.');
    }
    let rutaInterna = tipo;
    if (tipo === 'seguimientos') {
        rutaInterna = path.join('tickets', 'seguimientos');
    } 
    const pathImg = path.join(
        __dirname,
        '..',
        'uploads',
        susc,
        rutaInterna,
        foto
    );
    // console.log('Ruta de imagen buscada:', pathImg);
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

const eliminarArchivo = (req, res = response) => {
  var susc = req.params.susc;
  var folder = req.params.tipo;
  var archivo = req.params.foto;
  console.log('folder', folder);
  console.log('archivo', archivo);
  let rutaInterna = tipo;
  if (tipo == 'seguimientos') {
    rutaInterna = path.join('tickets', 'seguimientos');
  } else if (tipo == 'empresas' || tipo == 'usuarios-sc') {
    tipo = `suscriptores/${folder}`;
  }
  const pathImg = path.join(
    __dirname,
    '..',
    'uploads',
    susc,
    rutaInterna,
    archivo
  );
  try {
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
      return { ok: true, mensaje: `Archivo ${nombreArchivo} eliminado.` };
    } else {
      return { ok: false, mensaje: `Archivo ${nombreArchivo} no encontrado.` };
    }
  } catch (error) {
    return {
      ok: false,
      mensaje: `No se pudo eliminar el archivo ${nombreArchivo}.`,
      error: error.message
    };
  }
};

module.exports = {
  fileUpload,
  retornaImagen,
  eliminarArchivo,
};

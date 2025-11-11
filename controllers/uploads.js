/*
    Author: German Valencia
*/
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const fileUpload = (req, res = response) => {
  var tipo = req.params.tipo;
  var id = req.params.id;
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
      msg: "No es de suscriptores, aplicaciones, usuarios, documentos, informes, empresas, adjuntos, sitios, suites, sliders, tickets, seguimientos, firmas (tipo)",
    });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningún archivo",
    });
  }
  const file = req.files.foto;
  const nombreCortado = file.name.split("."); // wolverine.1.3.jpg
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  if (tipo == 'seguimientos') {
    tipo = 'tickets/seguimientos'
  }
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
  const path = `./uploads/${tipo}/${nombreArchivo}`;
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover el archivo",
      });
    }
    res.json({
      ok: true,
      msg: "Archivo cargado",
      nombreArchivo,
    });
  });
};

const retornaImagen = (req, res = response) => {
  var tipo = req.params.tipo;
  const foto = req.params.foto;
  if (tipo == 'seguimientos') {
    tipo = `tickets/${tipo}`
  } else if (tipo == 'empresas' || tipo == 'usuarios-sc') {
    tipo = `suscriptores/${folder}`;
  }
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  console.log('pathimg', pathImg);
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

const eliminarArchivo = (req, res = response) => {
  var folder = req.params.tipo;
  var archivo = req.params.foto;
  console.log('folder', folder);
  console.log('archivo', archivo);
  if (folder == 'seguimientos') {
    folder = `tickets/${folder}`
  } else if (folder == 'empresas' || folder == 'usuarios-sc') {
    folder = `suscriptores/${folder}`;
  }
  const path = `./uploads/${folder}/${archivo}`;
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
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

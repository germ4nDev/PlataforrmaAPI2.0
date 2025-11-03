/*
    Author: German Valencia
*/
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
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
    "firmas"
  ];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es de suscriptores, aplicaciones, usuarios, documentosss, adjuntos, sitios, firmas (tipo)",
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

  // Generar el nombre del archivo
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
  const tipo = req.params.tipo;
  const foto = req.params.foto;
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  console.log('pathimg', pathImg);
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  retornaImagen,
};

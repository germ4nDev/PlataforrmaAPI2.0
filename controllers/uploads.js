/*
    Author: German Valencia
*/
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  // Validar tipo
  const tiposValidos = [
    "suscriptores",
    "aplicaciones",
    "usuarios",
    "documentos",
    "informes",
    "empresas",
    "adjuntos",
    "sitios",
    "firmas"
  ];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es de suscriptores, aplicaciones, usuarios, documentosss, adjuntos, sitios, firmas (tipo)",
    });
  }

  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningún archivo",
    });
  }

  // Procesar la imagen...
  const file = req.files.imagen;
  const nombreCortado = file.name.split("."); // wolverine.1.3.jpg
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validar extension
  const extensionesValidas = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "zip",
  ];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extensión permitida",
    });
  }

  // Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
  // Path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // Mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover el archivo",
      });
    }

    // Actualizar base de datos
    // actualizarImagen( tipo, id, nombreArchivo );

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
  // imagen por defecto
  if (fs.existsSync(pathImg)) {
    // console.log("existe la ruta", pathImg);
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
  // res.json({
  //   ok: true,
  //   msg: "Archivo existe",
  //   ruta: pathImg
  // });
};

module.exports = {
  fileUpload,
  retornaImagen,
};

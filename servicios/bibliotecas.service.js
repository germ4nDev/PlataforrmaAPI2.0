const fs = require("fs");
const path = require("path");
const sequelize = require("../database/connection");
const PTLBiblioteca = require("../models/biblioteca")(sequelize);
const { io } = require("../index");

// El helper privado para manejar el sistema de archivos se queda aquí en el servicio
const borrarArchivoFisico = (fileName) => {
  if (!fileName || fileName === "no-imagen.png") return;

  const pathArchivo = path.join(__dirname, "..", "uploads", "plataforma", "biblioteca", "biblioteca", fileName);

  if (fs.existsSync(pathArchivo)) {
    try {
      fs.unlinkSync(pathArchivo);
      console.log(`Archivo físico de biblioteca eliminado correctamente: ${fileName}`);
    } catch (err) {
      console.error(`Error al intentar eliminar el archivo ${fileName}:`, err);
    }
  }
};

const obtenerBibliotecas = async () => {
  return await PTLBiblioteca.findAll();
};

const obtenerBibliotecaPorId = async (codigoBiblioteca) => {
  const biblioteca = await PTLBiblioteca.findOne({
    where: { codigoBiblioteca },
  });

  if (!biblioteca) {
    throw { statusCode: 404, msg: "No existe una biblioteca por ese id" };
  }

  return biblioteca;
};

const crearBiblioteca = async (data) => {
  const bibliotecaDB = await PTLBiblioteca.create(data);

  io.emit("biblioteca-actualizadas", {
    action: "create",
    msg: `Biblioteca creada: ${bibliotecaDB.nombreBiblioteca}`,
  });

  return bibliotecaDB;
};

const actualizarBiblioteca = async (codigoBiblioteca, data) => {
  const bibliotecaDB = await PTLBiblioteca.findOne({
    where: { codigoBiblioteca },
  });

  if (!bibliotecaDB) {
    throw { statusCode: 404, msg: "No existe una biblioteca con ese ID" };
  }

  // Verificamos si la imagen cambió para borrar la anterior físicamente
  if (data.imagenBiblioteca && bibliotecaDB.imagenBiblioteca !== data.imagenBiblioteca) {
    borrarArchivoFisico(bibliotecaDB.imagenBiblioteca);
  }

  await PTLBiblioteca.update(data, {
    where: { codigoBiblioteca },
  });

  const bibliotecaActualizada = await PTLBiblioteca.findOne({
    where: { codigoBiblioteca },
  });

  io.emit("biblioteca-actualizadas", {
    action: "update",
    msg: `Biblioteca actualizada: ${bibliotecaActualizada.nombreBiblioteca}`,
  });

  return bibliotecaActualizada;
};

const eliminarBiblioteca = async (codigoBiblioteca) => {
  const bibliotecaDB = await PTLBiblioteca.findOne({
    where: { codigoBiblioteca },
  });

  if (!bibliotecaDB) {
    throw { statusCode: 404, msg: "No existe una biblioteca con ese ID" };
  }

  // Borramos el archivo del disco antes de borrar el registro en base de datos
  borrarArchivoFisico(bibliotecaDB.imagenBiblioteca);

  const bibliotecaEliminada = await PTLBiblioteca.destroy({
    where: { codigoBiblioteca },
  });

  io.emit("biblioteca-actualizadas", {
    action: "delete",
    msg: `Biblioteca eliminada correctamente`,
  });

  return bibliotecaEliminada;
};

module.exports = {
  obtenerBibliotecas,
  obtenerBibliotecaPorId,
  crearBiblioteca,
  actualizarBiblioteca,
  eliminarBiblioteca,
};
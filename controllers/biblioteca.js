/*
    Author: German Valencia
    Actualización: Juan Camilo Valencia
*/
const express = require("express");
const fs = require("fs");
const path = require("path");
const sequelize = require("../database/connection");
const PTLBiblioteca = require("../models/biblioteca")(sequelize);
const { io } = require("../index");

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

const getBiblioteca = async (req, res) => {
  try {
    const bibliotecas = await PTLBiblioteca.findAll();
    return res.status(201).json({
      ok: true,
      bibliotecas: bibliotecas,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la Bibliotecas" });
  }
};

const getBibliotecaById = async (req, res) => {
  try {
    const codigoBiblioteca = req.params.id;
    const biblioteca = await PTLBiblioteca.findOne({
      where: {
        codigoBiblioteca: codigoBiblioteca,
      },
    });
    if (!biblioteca) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una biblioteca por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      biblioteca: biblioteca,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la biblioteca" });
  }
};

const createBiblioteca = async (req, res = response) => {
  try {
    const { ...nuevaBiblioteca } = req.body;
    console.log(req.body);
    const bibliotecaDB = await PTLBiblioteca.create(nuevaBiblioteca);
    io.emit("biblioteca-actualizadas", {
      action: "create",
      msg: `Biblioteca creada: ${bibliotecaDB.nombreBiblioteca}`,
    });
    return res.status(201).json({
      ok: true,
      biblioteca: bibliotecaDB,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al crear la biblioteca",
    });
  }
};

const updateBiblioteca = async (req, res = response) => {
  try {
    const { codigoBiblioteca, ...data } = req.body;
    const bibliotecaDB = await PTLBiblioteca.findOne({
      where: { codigoBiblioteca },
    });
    if (!bibliotecaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una biblioteca con ese ID",
      });
    }

    if (data.imagenBiblioteca && bibliotecaDB.imagenBiblioteca !== data.imagenBiblioteca) {
      borrarArchivoFisico(bibliotecaDB.imagenBiblioteca);
    }
    await PTLBiblioteca.update(data, {
      where: { codigoBiblioteca },
    });
    const bibliotecaActualizado = await PTLBiblioteca.findOne({
      where: { codigoBiblioteca },
    });
    io.emit("biblioteca-actualizadas", {
      action: "update",
      msg: `Biblioteca actualizada: ${bibliotecaActualizado.nombreBiblioteca}`,
    });
    return res.status(200).json({
      ok: true,
      biblioteca: bibliotecaActualizado,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al actualizar la biblioteca",
    });
  }
};

const deleteBiblioteca = async (req, res = response) => {
  try {
    const codigoBiblioteca = req.params.id;
    const bibliotecaDB = await PTLBiblioteca.findOne({
      where: { codigoBiblioteca },
    });
    if (!bibliotecaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un biblioteca con ese ID",
      });
    }
    borrarArchivoFisico(bibliotecaDB.imagenBiblioteca);
    bibliotecaEliminado = await PTLBiblioteca.destroy({
      where: { codigoBiblioteca },
    });
    io.emit("biblioteca-actualizadas", {
      action: "delete",
      msg: `Biblioteca eliminada correctamente`,
    });
    return res.status(200).json({
      ok: true,
      biblioteca: bibliotecaEliminado,
      msg: "la biblioteca se elimino correctamente",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al eliminar la biblioteca",
    });
  }
};

module.exports = {
  getBiblioteca,
  getBibliotecaById,
  createBiblioteca,
  updateBiblioteca,
  deleteBiblioteca,
};
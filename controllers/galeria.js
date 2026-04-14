/*
    Author: German Valencia
    Actualización: Juan Camilo Valencia
*/
const express = require("express");
const sequelize = require("../database/connection");
const PTLGaleria = require("../models/galeria")(sequelize);
const { io } = require("../index");

const getGaleria = async (req, res) => {
  try {
    const galerias = await PTLGaleria.findAll();
    return res.status(201).json({
      ok: true,
      galerias: galerias,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las Galerías" });
  }
};

const getGaleriaById = async (req, res) => {
  try {
    const codigoGaleria = req.params.id;
    const galeria = await PTLGaleria.findOne({
      where: {
        codigoGaleria: codigoGaleria,
      },
    });
    if (!galeria) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una galería con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      galeria: galeria,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la galería" });
  }
};

const createGaleria = async (req, res = response) => {
  try {
    const { ...nuevaGaleria } = req.body;
    const galeriaDB = await PTLGaleria.create(nuevaGaleria);
    io.emit("galeria-actualizadas", {
      action: "create",
      msg: `Galería creada: ${galeriaDB.nombreGaleria}`,
    });
    return res.status(201).json({
      ok: true,
      galeria: galeriaDB,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al crear la galería",
    });
  }
};

const updateGaleria = async (req, res = response) => {
  try {
    const { codigoGaleria, ...data } = req.body;
    const galeriaDB = await PTLGaleria.findOne({
      where: { codigoGaleria },
    });
    if (!galeriaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una galería con ese ID",
      });
    }
    await PTLGaleria.update(data, {
      where: { codigoGaleria },
    });
    const galeriaActualizada = await PTLGaleria.findOne({
      where: { codigoGaleria },
    });
    io.emit("galeria-actualizadas", {
      action: "update",
      msg: `Galería actualizada: ${galeriaActualizada.nombreGaleria}`,
    });
    return res.status(200).json({
      ok: true,
      galeria: galeriaActualizada,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al actualizar la galería",
    });
  }
};

const deleteGaleria = async (req, res = response) => {
  try {
    const codigoGaleria = req.params.id;
    const galeriaDB = await PTLGaleria.findOne({
      where: { codigoGaleria },
    });
    if (!galeriaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una galería con ese ID",
      });
    }
    galeriaEliminada = await PTLGaleria.destroy({
      where: { codigoGaleria },
    });
    io.emit("galeria-actualizadas", {
      action: "delete",
      msg: `Galería eliminada correctamente`,
    });
    return res.status(200).json({
      ok: true,
      galeria: galeriaEliminada,
      msg: "La galería se eliminó correctamente",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al eliminar la galería",
    });
  }
};

module.exports = {
  getGaleria,
  getGaleriaById,
  createGaleria,
  updateGaleria,
  deleteGaleria,
};

/*
    Author: German Valencia
    Actualización: Juab Camilo Valencia
*/
const express = require("express");
const sequelize = require("../database/connection");
const PTLFormatoGaleria = require("../models/formatosGaleria")(sequelize);
const { io } = require("../index");

const getFormatoGaleria = async (req, res) => {
  try {
    const formatosGaleria = await PTLFormatoGaleria.findAll();
    return res.status(201).json({
      ok: true,
      formatosGaleria: formatosGaleria,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los Formatos de Galería" });
  }
};

const getFormatoGaleriaById = async (req, res) => {
  try {
    const codigoFormato = req.params.id;
    const formatoGaleria = await PTLFormatoGaleria.findOne({
      where: {
        codigoFormato: codigoFormato,
      },
    });
    if (!formatoGaleria) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un formato de galería con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      formatoGaleria: formatoGaleria,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el formato de galería" });
  }
};

const createFormatoGaleria = async (req, res = response) => {
  try {
    const { ...nuevoFormatoGaleria } = req.body;
    const formatoGaleriaDB =
      await PTLFormatoGaleria.create(nuevoFormatoGaleria);
    io.emit("formatosGaleria-actualizadas", {
      action: "create",
      msg: `Formato de Galería creado: ${formatoGaleriaDB.nombreFormato}`,
    });
    return res.status(201).json({
      ok: true,
      formatoGaleria: formatoGaleriaDB,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al crear el formato de galería",
    });
  }
};

const updateFormatoGaleria = async (req, res = response) => {
  try {
    const { codigoFormato, ...data } = req.body;

    const formatoGaleriaDB = await PTLFormatoGaleria.findOne({
      where: { codigoFormato },
    });

    if (!formatoGaleriaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un formato de galería con ese ID",
      });
    }

    await PTLFormatoGaleria.update(data, {
      where: { codigoFormato },
    });

    const formatoGaleriaActualizado = await PTLFormatoGaleria.findOne({
      where: { codigoFormato },
    });

    io.emit("formatosGaleria-actualizadas", {
      action: "update",
      msg: `Formato de Galería actualizado: ${formatoGaleriaActualizado.nombreFormato}`,
    });

    return res.status(200).json({
      ok: true,
      formatoGaleria: formatoGaleriaActualizado,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al actualizar el formato de galería",
    });
  }
};

const deleteFormatoGaleria = async (req, res = response) => {
  try {
    const codigoFormato = req.params.id;

    const formatoGaleriaDB = await PTLFormatoGaleria.findOne({
      where: { codigoFormato },
    });

    if (!formatoGaleriaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un formato de galería con ese ID",
      });
    }

    const formatoGaleriaEliminado = await PTLFormatoGaleria.destroy({
      where: { codigoFormato },
    });

    io.emit("formatosGaleria-actualizadas", {
      action: "delete",
      msg: `Formato de Galería eliminado correctamente`,
    });

    return res.status(200).json({
      ok: true,
      formatoGaleria: formatoGaleriaEliminado,
      msg: "El formato de galería se eliminó correctamente",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al eliminar el formato de galería",
    });
  }
};

module.exports = {
  getFormatoGaleria,
  getFormatoGaleriaById,
  createFormatoGaleria,
  updateFormatoGaleria,
  deleteFormatoGaleria,
};

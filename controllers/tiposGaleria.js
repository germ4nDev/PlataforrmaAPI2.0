/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require("express");
const sequelize = require("../database/connection");
const PTLTipoGaleria = require("../models/tiposGaleria")(sequelize);
const { io } = require("../index");

const getTipoGaleria = async (req, res) => {
  try {
    const tiposGaleria = await PTLTipoGaleria.findAll();
    return res.status(201).json({
      ok: true,
      tiposGaleria: tiposGaleria,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los Tipos de Galería" });
  }
};

const getTipoGaleriaById = async (req, res) => {
  try {
    const codigoTipoGaleria = req.params.id;
    const tipoGaleria = await PTLTipoGaleria.findOne({
      where: {
        codigoTipoGaleria: codigoTipoGaleria,
      },
    });
    if (!tipoGaleria) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un tipo de galería con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      tipoGaleria: tipoGaleria,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el tipo de galería" });
  }
};

const createTipoGaleria = async (req, res = response) => {
  try {
    const { ...nuevoTipoGaleria } = req.body;
    const tipoGaleriaDB = await PTLTipoGaleria.create(nuevoTipoGaleria);
    io.emit("tiposGaleria-actualizadas", {
      action: "create",
      msg: `Tipo de Galería creado: ${tipoGaleriaDB.nombreTipoGaleria}`,
    });
    return res.status(201).json({
      ok: true,
      tipoGaleria: tipoGaleriaDB,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al crear el tipo de galería",
    });
  }
};

const updateTipoGaleria = async (req, res = response) => {
  try {
    const { codigoTipoGaleria, ...data } = req.body;
    const tipoGaleriaDB = await PTLTipoGaleria.findOne({
      where: { codigoTipoGaleria },
    });
    if (!tipoGaleriaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un tipo de galería con ese ID",
      });
    }
    await PTLTipoGaleria.update(data, {
      where: { codigoTipoGaleria },
    });
    const tipoGaleriaActualizado = await PTLTipoGaleria.findOne({
      where: { codigoTipoGaleria },
    });
    io.emit("tiposGaleria-actualizadas", {
      action: "update",
      msg: `Tipo de Galería actualizado: ${tipoGaleriaActualizado.nombreTipoGaleria}`,
    });
    return res.status(200).json({
      ok: true,
      tipoGaleria: tipoGaleriaActualizado,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al actualizar el tipo de galería",
    });
  }
};

const deleteTipoGaleria = async (req, res = response) => {
  try {
    const codigoTipoGaleria = req.params.id;
    const tipoGaleriaDB = await PTLTipoGaleria.findOne({
      where: { codigoTipoGaleria },
    });
    if (!tipoGaleriaDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un tipo de galería con ese ID",
      });
    }
    tipoGaleriaEliminado = await PTLTipoGaleria.destroy({
      where: { codigoTipoGaleria },
    });
    io.emit("tiposGaleria-actualizadas", {
      action: "delete",
      msg: `Tipo de Galería eliminado correctamente`,
    });
    return res.status(200).json({
      ok: true,
      tipoGaleria: tipoGaleriaEliminado,
      msg: "El tipo de galería se eliminó correctamente",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Error al eliminar el tipo de galería",
    });
  }
};

module.exports = {
  getTipoGaleria,
  getTipoGaleriaById,
  createTipoGaleria,
  updateTipoGaleria,
  deleteTipoGaleria,
};

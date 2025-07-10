/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSitiosAP = require('../models/sitio-ap')(sequelize);

const getSitios = async (req, res) => {
  try {
    const sitios = await PTLSitiosAP.findAll();
    return res.status(201).json({
      ok: true,
      sitios: sitios,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Sitios' });
  }
};

const getSitioById = async (req, res) => {
  try {
    const sitioId = req.params.id;
    const sitio = await PTLSitiosAP.findOne({
      where: {
        sitioId: sitioId,
      },
    });
    if (!sitio) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un sitio por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      sitio: sitio,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el sitio" });
  }
};

const createSitio = async (req, res = response) => {
  try {
    const nuevoSitio = req.body;
    const existeNombre = await PTLSitiosAP.findOne({
      where: { nombreSitio: nuevoSitio.nombreSitio }
    });
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un sitio con ese nombre'
      });
    }
    const sitioDB = await PTLSitiosAP.create(nuevoSitio);
    return res.status(201).json({
      ok: true,
      sitio: sitioDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el sitio'
    });
  }
};

const updateSitio = async (req, res = response) => {
  try {
    const { sitioId, ...data } = req.body;
    const sitioDB = await PTLSitiosAP.findOne({
      where: { sitioId }
    });
    if (!sitioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un sitio con ese ID'
      });
    }
    await PTLSitiosAP.update(data, {
      where: { sitioId }
    });
    const sitioActualizado = await PTLSitiosAP.findOne({ where: { sitioId } });
    return res.status(200).json({
      ok: true,
      sitio: sitioActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el sitio'
    });
  }
};

const deleteSitio = async (req, res = response) => {
  try {
    const sitioId = req.params.id;
    const sitioDB = await PTLSitiosAP.findOne({
      where: { sitioId }
    });
    if (!sitioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un sitio con ese ID'
      });
    }
    sitioEliminado = await PTLSitiosAP.destroy({
      where: { sitioId }
    });

    return res.status(200).json({
      ok: true,
      sitio: sitioEliminado,
      msg: 'Sitio eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el sitio'
    });
  }
};

module.exports = {
  getSitios,
  getSitioById,
  createSitio,
  updateSitio,
  deleteSitio,
};

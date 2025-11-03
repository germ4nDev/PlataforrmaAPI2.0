/*
    Author: German Valencia
    Actualización: John Castañeda
    Actualizado: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const suscriptor = require('../models/suscriptor');
const PTLSuscriptores = require('../models/suscriptor')(sequelize);

const getSuscriptores = async (req, res) => {
  try {
    const suscriptores = await PTLSuscriptores.findAll();
    return res.status(201).json({
      ok: true,
      suscriptores: suscriptores,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Suscriptores' });
  }
};
 
const getSuscriptoresById = async (req, res) => {
  try {
    const codigoSuscriptor = req.params.id;
    const suscriptor = await PTLSuscriptores.findOne({
      where: {
        codigoSuscriptor: codigoSuscriptor,
      },
    });
    if (!suscriptor) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suscriptor por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      suscriptor: suscriptor,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el suscriptor" });
  }
};

// Crear un nuevo rol
const createSuscriptor = async (req, res = response) => {
  try {
    const { ...newRegistro } = req.body;
    const existeNombre = await PTLSuscriptores.findOne({
      where: { nombreSuscriptor: newRegistro.nombreSuscriptor }
    });
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un suscriptor con ese nombre'
      });
    }
    const suscriptorDB = await PTLSuscriptores.create(newRegistro);
    return res.status(201).json({
      ok: true,
      suscriptor: suscriptorDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el suscriptor'
    });
  }
};

// Actualizar un nuevo rol
const updateSuscriptor = async (req, res = response) => {
  try {
    const { codigoSuscriptor, ...data } = req.body;
    const suscriptorDB = await PTLSuscriptores.findOne({
      where: { codigoSuscriptor }
    });
    if (!suscriptorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un suscriptor con ese ID'
      });
    }
    await PTLSuscriptores.update(data, {
      where: { codigoSuscriptor }
    });
    const suscriptorActualizado = await PTLSuscriptores.findOne({ where: { codigoSuscriptor } });
    return res.status(200).json({
      ok: true,
      suscriptor: suscriptorActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el suscriptor'
    });
  }
};

// Borrar un nuevo rol
const deleteSuscriptor = async (req, res = response) => {
  try {
    const codigoSuscriptor = req.params.id;
    const suscriptorDB = await PTLSuscriptores.findOne({
      where: { codigoSuscriptor }
    });
    if (!suscriptorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un suscriptor con ese ID'
      });
    }
    suscriptorEliminado = await PTLSuscriptores.destroy({
      where: { codigoSuscriptor }
    });

    return res.status(200).json({
      ok: true,
      suscriptor: suscriptorEliminado,
      msg: 'Suscriptor eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el suscriptor'
    });
  }
};

module.exports = {
  getSuscriptores,
  getSuscriptoresById,
  createSuscriptor,
  updateSuscriptor,
  deleteSuscriptor,
};

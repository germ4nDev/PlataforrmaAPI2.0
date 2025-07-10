/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLEnlacesST = require('../models/enlace-st')(sequelize);

// Obtener todos los Enlace
const getEnlaces = async (req, res) => {
  try {
    const enlace = await PTLEnlacesST.findAll();
    return res.status(201).json({
      ok: true,
      enlace: enlace,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener en enlace' });
  }
};

const getEnlaceById = async (req, res) => {
  try {
    const enlaceId = req.params.id;
    const enlace = await PTLEnlacesST.findOne({
      where: {
        enlaceId: enlaceId,
      },
    });
    if (!enlace) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un enlace por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      enlace: enlace,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el enlace" });
  }
};

// Crear un nuevo enlace
const createEnlace = async (req, res = response) => {
  try {
    const nuevoEnlace = req.body;
    const existeNombre = await PTLEnlacesST.findOne({
      where: { nombreEnlace: nuevoEnlace.nombreEnlace }
    });
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un enlace con ese nombre'
      });
    }
    const enlaceDB = await PTLEnlacesST.create(nuevoEnlace);
    return res.status(201).json({
      ok: true,
      enlace: enlaceDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el enlace'
    });
  }
};

// Actualizar un nuevo enlace
const updateEnlace = async (req, res = response) => {
  try {
    const { enlaceId, ...data } = req.body;
    const enlaceDB = await PTLEnlacesST.findOne({
      where: { enlaceId }
    });
    if (!enlaceDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un enlace con ese ID'
      });
    }
    await PTLEnlacesST.update(data, {
      where: { enlaceId }
    });
    const enlaceActualizado = await PTLEnlacesST.findOne({ where: { enlaceId } });
    return res.status(200).json({
      ok: true,
      enlace: enlaceActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el enlace'
    });
  }
};

// Borrar un nuevo enlace
const deleteEnlace = async (req, res = response) => {
  try {
    const enlaceId = req.params.id;
    const enlaceDB = await PTLEnlacesST.findOne({
      where: { enlaceId }
    });
    if (!enlaceDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un sitio con ese ID'
      });
    }
    enlaceEliminado = await PTLEnlacesST.destroy({
      where: { enlaceId }
    });

    return res.status(200).json({
      ok: true,
      enlace: enlaceEliminado,
      msg: 'Enlace eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el enlace'
    });
  }
};

module.exports = {
    getEnlaces,
    getEnlaceById,
    createEnlace,
    updateEnlace,
    deleteEnlace,
};

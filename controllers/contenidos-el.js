/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLContenidosEL = require('../models/contenido-el')(sequelize);

// Obtener todos los Contenido
const getContenidos = async (req, res) => {
  try {
    const contenido = await PTLContenidosEL.findAll();
    return res.status(201).json({
      ok: true,
      contenido: contenido,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener en Contenido' });
  }
};

const getContenidoById = async (req, res) => {
  try {
    const contenidoId = req.params.id;
    const contenido = await PTLContenidosEL.findOne({
      where: {
        contenidoId: contenidoId,
      },
    });
    if (!contenido) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un contenido por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      contenido: contenido,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el contenido" });
  }
};

// Crear un nuevo Contenido
const createContenido = async (req, res = response) => {
  try {
    const nuevoContenido = req.body;
    const existeNombre = await PTLContenidosEL.findOne({
      where: { nombreContenido: nuevoContenido.nombreContenido }
    });
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un contenido con ese nombre'
      });
    }
    const contenidoDB = await PTLContenidosEL.create(nuevoContenido);
    return res.status(201).json({
      ok: true,
      contenido: contenidoDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el contenido'
    });
  }
};

// Actualizar un nuevo Contenido
const updateContenido = async (req, res = response) => {
  try {
    const { contenidoId, ...data } = req.body;
    const contenidoDB = await PTLContenidosEL.findOne({
      where: { contenidoId }
    });
    if (!contenidoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un contenido con ese ID'
      });
    }
    await PTLContenidosEL.update(data, {
      where: { contenidoId }
    });
    const contenidoActualizado = await PTLContenidosEL.findOne({ where: { contenidoId } });
    return res.status(200).json({
      ok: true,
      contenido: contenidoActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el contenido'
    });
  }
};

// Borrar un nuevo Contenido
const deleteContenido = async (req, res = response) => {
  try {
    const contenidoId = req.params.id;
    const contenidoDB = await PTLContenidosEL.findOne({
      where: { contenidoId }
    });
    if (!contenidoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un sitio con ese ID'
      });
    }
    contenidoEliminado = await PTLContenidosEL.destroy({
      where: { contenidoId }
    });

    return res.status(200).json({
      ok: true,
      contenido: contenidoEliminado,
      msg: 'Contenido eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el contenido'
    });
  }
};

module.exports = {
    getContenidos,
    getContenidoById,
    createContenido,
    updateContenido,
    deleteContenido,
};

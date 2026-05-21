/*
    Author: German Valencia
    Refactored for: QPLUS DTO Pattern
*/
const { response } = require('express');
const ContenidosELService = require('../services/contenidos-el.service');
const service = new ContenidosELService();

const getContenidos = async (req, res = response) => {
  try {
    const contenidos = await service.getContenidos();

    return res.status(200).json({
      ok: true,
      contenidos: contenidos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al get en Contenido' });
  }
};

const getContenidoByCode = async (req, res = response) => {
  try {
    const contenido = await service.getContenidoByCode(req.params.id);

    return res.status(200).json({
      ok: true,
      contenido: contenido,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al get el contenido" });
  }
};

const createContenido = async (req, res = response) => {
  try {
    const contenidoDB = await service.createContenido(req.body);

    return res.status(201).json({
      ok: true,
      contenido: contenidoDB
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el contenido'
    });
  }
};

const updateContenido = async (req, res = response) => {
  try {
    const { codigoContenido, ...data } = req.body;

    const contenidoActualizado = await service.updateContenido(codigoContenido, data);

    return res.status(200).json({
      ok: true,
      contenido: contenidoActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el contenido'
    });
  }
};

const deleteContenido = async (req, res = response) => {
  try {
    const contenidoEliminado = await service.deleteContenido(req.params.id);

    return res.status(200).json({
      ok: true,
      contenido: contenidoEliminado,
      msg: 'Contenido eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el contenido'
    });
  }
};

module.exports = {
  getContenidos,
  getContenidoByCode,
  createContenido,
  updateContenido,
  deleteContenido,
};
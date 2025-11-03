/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLRequerimientosTK = require('../models/requerimiento')(sequelize);

const getRequerimientosTK = async (req, res) => {
  try {
    const requerimientos = await PTLRequerimientosTK.findAll();
    return res.status(201).json({
      ok: true,
      requerimientos: requerimientos,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener requerimientos' });
  }
};

const getRequerimientoTKById = async (req, res) => {
  try {
    const codigoRequerimiento = req.params.id;
    const requerimiento = await PTLRequerimientosTK.findOne({
      where: {
        codigoRequerimiento: codigoRequerimiento,
      },
    });
    if (!requerimiento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un requerimiento por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      requerimiento: requerimiento,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener requerimiento" });
  }
};

const createRequerimientoTK = async (req, res = response) => {
  try {
    const { ...newRegistro } = req.body;
    const requerimientoDB = await PTLRequerimientosTK.create(newRegistro);
    return res.status(201).json({
      ok: true,
      requerimiento: requerimientoDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el requerimiento'
    });
  }
};

const updateRequerimientoTK = async (req, res = response) => {
  try {
    const { codigoRequerimiento, ...data } = req.body;
    const requerimientoDB = await PTLRequerimientosTK.findOne({
      where: { codigoRequerimiento }
    });
    if (!requerimientoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un requerimiento con ese ID'
      });
    }
    await PTLRequerimientosTK.update(data, {
      where: { codigoRequerimiento }
    });
    const requerimientoActualizado = await PTLRequerimientosTK.findOne({ where: { codigoRequerimiento } });
    return res.status(200).json({
      ok: true,
      requerimiento: requerimientoActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el requerimiento'
    });
  }
};

const updateEstadoRequerimiento = async (req, res = response) => {
  try {
    const codigoRequerimiento = req.params.id;
    const { estadoRequerimiento } = req.body;

    const requerimientoDB = await PTLRequerimientosTK.findOne({
      where: { codigoRequerimiento }
    });

    if (!requerimientoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un requerimiento con ese ID'
      });
    }

    await PTLRequerimientosTK.update(
      { estadoRequerimiento },
      { where: { codigoRequerimiento } }
    );

    return res.status(200).json({
      ok: true,
      msg: 'Estado actualizado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el estado del requerimiento'
    });
  }
};

const deleteRequerimientoTK = async (req, res = response) => {
  try {
    const codigoRequerimiento = req.params.id;
    const requerimientoDB = await PTLRequerimientosTK.findOne({
      where: { codigoRequerimiento }
    });
    if (!requerimientoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un requerimiento con ese ID'
      });
    }
    requerimientoEliminado = await PTLRequerimientosTK.destroy({
      where: { codigoRequerimiento }
    });

    return res.status(200).json({
      ok: true,
      usuario: requerimientoEliminado,
      msg: 'requerimiento eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el requerimiento'
    });
  }
};

module.exports = {
  getRequerimientosTK,
  getRequerimientoTKById,
  createRequerimientoTK,
  updateRequerimientoTK,
  updateEstadoRequerimiento,
  deleteRequerimientoTK,
};
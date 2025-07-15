/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLSuitesAP = require('../models/suites-ap')(sequelize);

const getSuitesAP = async (req, res) => {
  try {
    const suites = await PTLSuitesAP.findAll();
    return res.status(201).json({
      ok: true,
      suites: suites,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Suites' });
  }
};

const getSuitesAPById = async (req, res) => {
  try {
    const suiteId = req.params.id;
    const suite = await PTLSuitesAP.findOne({
      where: {
        suiteId,
      },
    });
    if (!suite) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suite por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      suite: suite,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener suite" });
  }
};

const createSuiteAP = async (req, res = response) => {
  try {
    const nuevaSuite = req.body;
    const existeNombre = await PTLSuitesAP.findOne({
      where: { suiteId: nuevaSuite.suiteId }
    });
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un suite con ese nombre'
      });
    }
    const suiteDB = await PTLSuitesAP.create(nuevaSuite);
    return res.status(201).json({
      ok: true,
      suite: suiteDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el suite'
    });
  }
};
const updateSuiteAP = async (req, res = response) => {
  try {
    const { suiteId, ...data } = req.body;
    const suiteDB = await PTLSuitesAP.findOne({
      where: { suiteId }
    });
    if (!suiteDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un suite con ese ID'
      });
    }
    await PTLSuitesAP.update(data, {
      where: { suiteId }
    });
    const suiteActualizado = await PTLSuitesAP.findOne({ where: { suiteId } });
    return res.status(200).json({
      ok: true,
      suite: suiteActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el suite'
    });
  }
};

const deleteSuiteAP = async (req, res = response) => {
  try {
    const suiteId = req.params.id;
    const suiteDB = await PTLSuitesAP.findOne({
      where: { suiteId }
    });
    if (!suiteDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una suite con ese ID'
      });
    }
    suiteEliminado = await PTLSuitesAP.destroy({
      where: { suiteId }
    });

    return res.status(200).json({
      ok: true,
      suite: suiteEliminado,
      msg: 'Suite eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el suite'
    });
  }
};

module.exports = {
  getSuitesAP,
  getSuitesAPById,
  createSuiteAP,
  updateSuiteAP,
  deleteSuiteAP,
};
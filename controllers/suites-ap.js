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
    const codigoSuite = req.params.id;
        console.log('suite', codigoSuite);
    const suite = await PTLSuitesAP.findOne({
      where: { codigoSuite },
    });
    if (!suite) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un suite por ese id",
      });
    }
    console.log('suite', suite);
    
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
    const { ...newRegistro } = req.body;
    const existeNombre = await PTLSuitesAP.findOne({
      where: { nombresuite: newRegistro.nombreSuite }
    });
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un suite con ese nombre'
      });
    }
    const suiteDB = await PTLSuitesAP.create(newRegistro);
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
    const { codigoSuite, ...data } = req.body;
    const suiteDB = await PTLSuitesAP.findOne({
      where: { codigoSuite }
    });
    if (!suiteDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un suite con ese ID'
      });
    }
    await PTLSuitesAP.update(data, {
      where: { codigoSuite }
    });
    const suiteActualizado = await PTLSuitesAP.findOne({ where: { codigoSuite } });
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
    const codigoSuite = req.params.id;
    const suiteDB = await PTLSuitesAP.findOne({
      where: { codigoSuite }
    });
    if (!suiteDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una suite con ese ID'
      });
    }
    suiteEliminado = await PTLSuitesAP.destroy({
      where: { codigoSuite }
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
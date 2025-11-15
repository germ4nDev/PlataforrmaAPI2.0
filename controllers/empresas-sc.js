/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLEmpresasSC = require('../models/empresa-sc')(sequelize);

const getEmpresasSC = async (req, res) => {
  try {
    const empresasSC = await PTLEmpresasSC.findAll();
    return res.status(201).json({
      ok: true,
      empresasSC: empresasSC,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empresasSC' });
  }
};

const getEmpresaSCById = async (req, res) => {
  try {
    const { codigoEmpresaSC } = req.body;
    const empresaSC = await PTLEmpresasSC.findById(codigoEmpresaSC);
    if (!empresaSC) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un empresaSC por el id",
      });
    }
    return res.status(201).json({
      ok: true,
      empresaSC: empresaSC,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empresaSC' });
  }
};

const createEmpresaSC = async (req, res = response) => {
  try {
    const { ...newRegistro } = req.body;
    const nuevo = await PTLEmpresasSC.create(newRegistro);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la empresaSC' });
  }
};

const updateEmpresaSC = async (req, res = response) => {
  try {
    const { codigoEmpresaSC, ...data } = req.body;
    const EmpresaSCDB = await PTLEmpresasSC.find(codigoEmpresaSC);
    if (!EmpresaSCDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una empresaSC por ese id",
      });
    }
    const empresaSCActualizado = await PTLEmpresasSC.findByIdAndUpdate({ data, empresaSC });
    return res.status(201).json({
      ok: true,
      empresaSC: empresaSCActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la EmpresaSC' });
  }
};

const deleteEmpresaSC = async (req, res = response) => {
  try {
    const { codigoEmpresaSC } = req.body;
    const empresaSCDB = await PTLEmpresasSC.findOne(codigoEmpresaSC);
    if (!empresaSCDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una empresaSC por el id",
      });
    }
    const empresaSCEliminado = await PTLEmpresasSC.findByIdAndDelete({ codigoEmpresaSC });
    return res.status(201).json({
      ok: true,
      empresaSC: empresaSCEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la empresaSC' });
  }
};

module.exports = {
  getEmpresasSC,
  getEmpresaSCById,
  createEmpresaSC,
  updateEmpresaSC,
  deleteEmpresaSC,
};
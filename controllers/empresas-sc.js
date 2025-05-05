/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLEmpresasSC = require('../models/empresa-sc')(sequelize);

// Obtener todos los roles
const getEmpresasSC = async (req, res) => {
  try {
    const empresasST = await PTLEmpresasSC.findAll();
    return res.status(201).json({
      ok: true,
      elpresasST: empresasST,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empresasST' });
  }
};

const getEmpresaSCById = async (req, res) => {
  try {
    const { empresaId } = req.body;
    const empresaST = await PTLEmpresasSC.findById(empresaId);
    if (!empresaST) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un empresaST por el id",
      });
    }
    return res.status(201).json({
      ok: true,
      empresaST: empresaST,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empresaST' });
  }
};

// Crear un nuevo rol
const createEmpresaSC = async (req, res = response) => {
  try {
    const empresaST = req.body;
    const nuevo = await PTLEmpresasSC.create(empresaST);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la empresaST' });
  }
};

// Actualizar un nuevo rol
const updateEmpresaSC = async (req, res = response) => {
  try {
    const { empresaId } = req.body;
    const empresaST = req.body;
    const EmpresaSCDB = await PTLEmpresasSC.find(empresaId);
    if (!EmpresaSCDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una empresaST por ese id",
      });
    }
    const empresaSTActualizado = await PTLEmpresasSC.findByIdAndUpdate({ empresaId, empresaST });
    return res.status(201).json({
      ok: true,
      empresaST: empresaSTActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la EmpresaSC' });
  }
};

// Borrar un nuevo rol
const deleteEmpresaSC = async (req, res = response) => {
  try {
    const { empresaId } = req.body;
    const empresaSTDB = await PTLEmpresasSC.findOne(empresaId);
    if (!empresaSTDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una empresaST por el id",
      });
    }
    const empresaSTEliminado = await PTLEmpresasSC.findByIdAndDelete({ empresaId });
    return res.status(201).json({
      ok: true,
      empresaST: empresaSTEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la empresaST' });
  }
};

module.exports = {
  getEmpresasSC,
  getEmpresaSCById,
  createEmpresaSC,
  updateEmpresaSC,
  deleteEmpresaSC,
};
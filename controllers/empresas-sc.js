/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLEmpresasSC = require('../models/empresa-sc')(sequelize);

// Obtener todas las empresas
const getEmpresasSC = async (req, res) => {
  try {
    const empresasST = await PTLEmpresasSC.findAll();
    return res.status(201).json({
      ok: true,
      elpresasST: empresasST,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empresasSC' });
  }
};

const getEmpresaSCById = async (req, res) => {
  try {
    const { empresaId } = req.body;
    const empresaSC = await PTLEmpresasSC.findById(empresaId);
    if (!empresaSC) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una empresa con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      empresaSC: empresaSC,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la empresaSC' });
  }
};

// Crear una nueva empresa
const createEmpresaSC = async (req, res = response) => {
  try {
    const empresaSC = req.body;
    const nuevo = await PTLEmpresasSC.create(empresaSC);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la empresaSC' });
  }
};

// Actualizar una empresa
const updateEmpresaSC = async (req, res = response) => {
  try {
    const { empresaId } = req.body;
    const empresaSC = req.body;
    const EmpresaSCDB = await PTLEmpresasSC.find(empresaId);
    if (!EmpresaSCDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una empresa con ese id",
      });
    }
    const empresaSCActualizado = await PTLEmpresasSC.findByIdAndUpdate({ empresaId, empresaSC });
    return res.status(201).json({
      ok: true,
      empresaSC: empresaSCActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la EmpresaSC' });
  }
};

// Borrar una empresa
const deleteEmpresaSC = async (req, res = response) => {
  try {
    const { empresaId } = req.body;
    const empresaSCDB = await PTLEmpresasSC.findOne(empresaId);
    if (!empresaSCDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una empresa con ese id",
      });
    }
    const empresaSCEliminado = await PTLEmpresasSC.findByIdAndDelete({ empresaId });
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
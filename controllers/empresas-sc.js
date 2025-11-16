/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLEmpresasSC = require('../models/empresa-sc')(sequelize);
const { io } = require('../index');

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
  const { ...newRegistro } = req.body;
  try {
    const nuevo = await PTLEmpresasSC.create(newRegistro);
    io.emit('empresas-sc-actualizadas', {
      action: 'create',
      msg: `Empresa creada: ${nuevo.nombreEmpresa}`
    });
    return res.status(201).json({
      ok: true,
      empresa: nuevo
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la empresaSC' });
  }
};

const updateEmpresaSC = async (req, res = response) => {
  const { codigoEmpresaSC, ...data } = req.body;
  try {
    const EmpresaSCDB = await PTLEmpresasSC.find.findOne({
      where: { codigoEmpresaSC }
    });
    if (!EmpresaSCDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una empresaSC por ese id",
      });
    }
    const empresaSCActualizado = await PTLEmpresasSC.update(data, {
      where: { codigoEmpresaSC }
    });
    io.emit('empresas-sc-actualizadas', {
      action: 'update',
      msg: `Empresa acturlizada: ${empresaSCActualizado.nombreEmpresa}`
    });
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
    const codigoEmpresa = req.params.id;
    const empresaDB = await PTLEmpresasSC.findOne({
      where: { codigoEmpresa }
    });
    if (!empresaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una aplicación con ese ID'
      });
    }
    const nombreEmpresa = empresaDB.nombreEmpresa;
    const empresaEliminada = await PTLEmpresasSC.destroy({
      where: { codigoEmpresa }
    });
    io.emit('aplicaciones-actualizadas', {
      action: 'delete',
      msg: `Aplicación eliminada correctamente: ${nombreEmpresa}`
    });
    return res.status(200).json({
      ok: true,
      empresaSC: empresaEliminada,
      msg: 'Aplicación eliminada correctamente'
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
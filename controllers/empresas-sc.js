/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLEmpresasSC = require('../models/empresa-sc')(sequelize);

// Obtener todos los roles
const getEmpresasSC = async (req, res) => {
  try {
    const empresasSC = await PTLEmpresasSC.findAll();
    return res.status(201).json({
      ok: true,
      empresas: empresasSC,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empresasSC' });
  }
};

const getEmpresaSCById = async (req, res) => {
  try {
    const empresaId = req.params.id;
    const empresa = await PTLEmpresasSC.findOne({
      where: {
        empresaId: empresaId,
      },
    });
    if (!empresa) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un empresa por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      empresa: empresa,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener empresa" });
  }
};

// Crear un nuevo rol
const createEmpresaSC = async (req, res = response) => {
  try {
    const nuevoEmpresaSC = req.body;
    const empresaDB = await PTLEmpresasSC.create(nuevoEmpresaSC);
    return res.status(201).json({
      ok: true,
      empresa: empresaDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el empresa'
    });
  }
};

// Actualizar un nuevo rol
const updateEmpresaSC = async (req, res = response) => {
  try {
    const { empresaId, ...data } = req.body;
    const empresaDB = await PTLEmpresasSC.findOne({
      where: { empresaId }
    });
    if (!empresaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un empresa con ese ID'
      });
    }
    await PTLEmpresasSC.update(data, {
      where: { empresaId }
    });
    const empresaActualizado = await PTLEmpresasSC.findOne({ where: { empresaId } });
    return res.status(200).json({
      ok: true,
      empresa: empresaActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el empresa'
    });
  }
};

// Borrar un nuevo rol
const deleteEmpresaSC = async (req, res = response) => {
  try {
    const empresaId = req.params.id;
    const empresaDB = await PTLEmpresasSC.findOne({
      where: { empresaId }
    });
    if (!empresaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un empresa con ese ID'
      });
    }
    empresaEliminado = await PTLEmpresasSC.destroy({
      where: { empresaId }
    });

    return res.status(200).json({
      ok: true,
      usuario: empresaEliminado,
      msg: 'empresa eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el empresa'
    });
  }
};

module.exports = {
  getEmpresasSC,
  getEmpresaSCById,
  createEmpresaSC,
  updateEmpresaSC,
  deleteEmpresaSC,
};
/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLColorSettings = require('../models/color-setting')(sequelize);

// Obtener todos los roles
const getColoresSettings = async (req, res) => {
  try {
    const coloresNav = await PTLColorSettings.findAll();
    return res.status(201).json({
      ok: true,
      coloresNav: coloresNav,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la ColoresSettings' });
  }
};

const getColorSettingById = async (req, res) => {
  try {
    const colorNavId = req.params.id;
    const colorNav = await PTLColorSettings.findOne({
      where: {
        colorNavId: colorNavId,
      },
    });
    if (!colorNav) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una colorNav por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      colorNav: colorNav,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la colorNav" });
  }
};

// Crear un nuevo rol
const createColorSetting = async (req, res = response) => {
  try {
    const nuevaColorSetting = req.body;
    const colorNavDB = await PTLColorSettings.create(nuevaColorSetting);
    return res.status(201).json({
      ok: true,
      colorNav: colorNavDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear la colorNav'
    });
  }
};

// Actualizar un nuevo rol
const updateColorSetting = async (req, res = response) => {
  try {
    const { colorNavId, ...data } = req.body;
    const colorNavDB = await PTLColorSettings.findOne({
      where: { colorNavId }
    });
    if (!colorNavDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una colorNav con ese ID'
      });
    }
    await PTLColorSettings.update(data, {
      where: { colorNavId }
    });
    const colorNavActualizado = await PTLColorSettings.findOne({ where: { colorNavId } });
    return res.status(200).json({
      ok: true,
      colorNav: colorNavActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar la colorNav'
    });
  }
};

// Borrar un nuevo rol
const deleteColorSetting = async (req, res = response) => {
  try {
    const colorNavId = req.params.id;
    const colorNavDB = await PTLColorSettings.findOne({
      where: { colorNavId }
    });
    if (!colorNavDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un colorNav con ese ID'
      });
    }
    colorNavEliminado = await PTLColorSettings.destroy({
      where: { colorNavId }
    });

    return res.status(200).json({
      ok: true,
      colorNav: colorNavEliminado,
      msg: 'la colorNav se elimino correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar la colorNav'
    });
  }
};

module.exports = {
  getColoresSettings,
  getColorSettingById,
  createColorSetting,
  updateColorSetting,
  deleteColorSetting,
};
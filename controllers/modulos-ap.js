/*
    Author: German Valencia
*/
const express = require("express");
const sequelize = require("../database/connection");
const PTModulosAP = require("../models/modulo-ap")(sequelize);

const getModulos = async (req, res) => {
  try {
    const modulos = await PTModulosAP.findAll();
    return res.status(201).json({
      ok: true,
      modulos: modulos,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Modulos" });
  }
};

const getModuloById = async (req, res) => {
  try {
    const codigoModulo = req.params.id;
    console.log("consultar el id", codigoModulo);
    const modulo = await PTModulosAP.findOne({
      where: { codigoModulo },
    });
    console.log("modulo", modulo);
    if (!modulo) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un modulo por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      modulo: modulo,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener modulo" });
  }
};

const createModulo = async (req, res = response) => {
  const { ...data } = req.body;
  console.log('data modulo', data);
  try {
    const existente = await PTModulosAP.findOne({
      where: { codigoModulo: data.codigoModulo }
    });
    const existeNombre = await PTModulosAP.findOne({
      where: { nombreModulo: data.nombreModulo }
    });
    if (existente) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe una modulo con ese código'
      });
    }
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe una modulo con ese nombre'
      });
    }
    const nuevo = await PTModulosAP.create(data);
    return res.status(201).json({
      ok: true,
      modulo: nuevo,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el modulo" });
  }
};

const updateModulo = async (req, res = response) => {
  const { codigoModulo, ...data } = req.body;
  try {
    const moduloOg = await PTModulosAP.findOne({
      where: { codigoModulo },
    });
    if (!moduloOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un modulo por ese id",
      });
    }
    await PTModulosAP.update(data, {
      where: { codigoModulo },
    });
    const moduloActualizado = await PTModulosAP.findOne({
      where: { codigoModulo },
    });
    return res.status(201).json({
      ok: true,
      modulo: moduloActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el modulo" });
  }
};

const deleteModulo = async (req, res = response) => {
  try {
    const codigoModulo = req.params.id;
    const modulo = await PTModulosAP.findOne({
      where: { codigoModulo },
    });
    if (!modulo) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un modulo por ese id",
      });
    }
    const moduloEliminado = await PTModulosAP.destroy({
      where: { codigoModulo },
    });
    return res.status(201).json({
      ok: true,
      modulo: moduloEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar modulo" });
  }
};

module.exports = {
  getModulos,
  getModuloById,
  createModulo,
  updateModulo,
  deleteModulo,
};

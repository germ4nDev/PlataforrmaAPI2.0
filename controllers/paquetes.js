/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLPaquetes = require('../models/paquete')(sequelize);
const { io } = require('../index');

const getPaquetes = async (req, res) => {
  try {
    const paquetes = await PTLPaquetes.findAll();
    return res.status(201).json({
      ok: true,
      paquetes: paquetes,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Paquetes' });
  }
};

const getPaqueteById = async (req, res) => {
  try {
    const codigoPaquete = req.params.id;
    const paquete = await PTLPaquetes.findOne({
      where: { codigoPaquete },
    });
    if (!paquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete por ese codigo",
      });
    }
    return res.status(201).json({
      ok: true,
      paquete: paquete,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

const createPaquete = async (req, res = response) => {
  const { ...newRegistro } = req.body;
  try {
    const nuevo = await PTLPaquetes.create(newRegistro);
    io.emit('paquetes-actualizados', {
      action: 'create',
      msg: `Paquete creado: ${nuevo.nombrePaquete}`
    });
    return res.status(201).json({
      ok: true,
      suscriptorPaquete: paqueteSCDB
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el paquete' });
  }
};

const updatePaquete = async (req, res = response) => {
  const { codigoPaquete, ...data } = req.body;
  try {
    const paqueteOg = await PTLPaquetes.findOne({
      where: { codigoPaquete },
    });
    if (!paqueteOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete por ese id",
      });
    }
    await PTLPaquetes.update(data, {
      where: { codigoPaquete }
    });
    const paqueteActualizado = await PTLPaquetes.findOne({ where: { codigoPaquete } });
    io.emit('paquetes-actualizados', {
      action: 'update',
      msg: `Paquete actualizado: ${paqueteActualizado.nombrePaquete}`
    });
    return res.status(201).json({
      ok: true,
      paquete: paqueteActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el paquete' });
  }
};

const deletePaquete = async (req, res = response) => {
  try {
    const codigoPaquete = req.params.id;
    const paquete = await PTLPaquetes.findOne({
      where: { codigoPaquete },
    });
    if (!paquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete por ese id",
      });
    }
    const paqueteEliminado = await PTLPaquetes.destroy({
      where: { codigoPaquete }
    });
    io.emit('paquetes-actualizados', {
      action: 'delete',
      msg: `Paquete eliminado: ${paqueteEliminado.nombrePaquete}`
    });
    return res.status(201).json({
      ok: true,
      paquete: paqueteEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar paquete' });
  }
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete,
};
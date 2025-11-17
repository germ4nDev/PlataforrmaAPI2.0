/*
    Author: German Valencia
    Actualizado: German Valiencia 20251026
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLVersionesAP = require('../models/version-ap')(sequelize);
const { io } = require('../index');

const getVersionesAP = async (req, res) => {
  try {
    const versiones = await PTLVersionesAP.findAll();
    return res.status(201).json({
      ok: true,
      versiones: versiones,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener versionesA{' });
  }
};

const getVersionesAPById = async (req, res) => {
  try {
    const codigoVersion = req.params.id;
    const version = await PTLVersionesAP.findOne({
      where: { codigoVersion },
    });
    if (!version) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un versionAP por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      version: version,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener versionAP' });
  }
};

const createVersionAP = async (req, res = response) => {
  const { ...newRegistro } = req.body;
  try {
    const nuevo = await PTLVersionesAP.create(newRegistro);
    io.emit("versiones-actualizados", {
      action: "create",
      msg: `Version creado: ${nuevo.nombreVersion}`,
    });
    return res.status(201).json({
      ok: true,
      version: nuevo,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear ;a VersionAP' });
  }
};

const updateVersionAP = async (req, res = response) => {
  const { codigoVersion, ...data } = req.body;
  try {
    const version = await PTLVersionesAP.findOne({
      where: { codigoVersion },
    });
    if (!version) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un versionAP por ese id",
      });
    }
    const newVersion = {
      codigoVersion: codigoVersion,
      codigoAplicacion: data.codigoAplicacion,
      fechaVersion: data.fechaVersion,
      nombreVersion: data.nombreVersion,
      version: data.version,
      descripcionVersion: data.descripcionVersion,
      estadoVersion: data.estadoVersion,
      codigoUsuarioCreacion: data.codigoUsuarioCreacion,
      fechaCreacion: data.fechaCreacion,
      codigoUsuarioModificacion: data.codigoUsuarioModificacion,
      fechaModificacion: data.fechaModificacion
    }
    console.log('data de la version', newVersion);
    await PTLVersionesAP.update(newVersion, {
      where: { codigoVersion }
    });
    const versionAPActualizado = await PTLVersionesAP.findOne({ where: { codigoVersion } });
    io.emit("versiones-actualizados", {
      action: "update",
      msg: `Version actulozada: ${versionAPActualizado.nombreVersion}`,
    });
    return res.status(201).json({
      ok: true,
      version: versionAPActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la versionAP' });
  }
};

const deleteVersionAP = async (req, res = response) => {
  try {
    const codigoVersion = req.params.id;
    const version = await PTLVersionesAP.findOne({
      where: { codigoVersion },
    });
    if (!version) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un versionesId por ese id",
      });
    }
    const versionAPEliminado = await PTLVersionesAP.destroy({
      where: { codigoVersion }
    });
    io.emit("versiones-actualizados", {
      action: "delete",
      msg: `Version eliminada: ${versionAPEliminado.nombreVersion}`,
    });
    return res.status(201).json({
      ok: true,
      version: versionAPEliminado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario versionAP' });
  }
};

module.exports = {
  getVersionesAP,
  getVersionesAPById,
  createVersionAP,
  updateVersionAP,
  deleteVersionAP,
};

/*
    Author: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLTiposLogs = require('../models/tipo-log')(sequelize);
const { io } = require('../index');

const getTiposLogs = async (req, res) => {
  try {
    const tipos = await PTLTiposLogs.findAll();
    return res.status(201).json({
      ok: true,
      tiposLogs: tipos,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los tiposLogs ' + err });
  }
};

const getTipoLogById = async (req, res) => {
  try {
    const codigoTipoLog = req.params.id;
    const tipoLog = await PTLTiposLogs.findOne({
      where: {
        codigoTipoLog: codigoTipoLog,
      },
    });
    if (!tipoLog) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un tiposLogs por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      tipoLog: tipoLog,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tiposLogs" });
  }
};

const createTipoLog = async (req, res = response) => {
  try {
    const { ...newRegistro } = req.body;
    const tipoLogDB = await PTLTiposLogs.create(newRegistro);
    return res.status(201).json({
      ok: true,
      tipoLog: tipoLogDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el tiposLogs'
    });
  }
};

const updateTipoLog = async (req, res = response) => {
  try {
    const { codigoTipoLog, ...data } = req.body;
    const tipoLogDB = await PTLTiposLogs.findOne({
      where: { codigoTipoLog }
    });
    if (!tipoLogDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un tiposLogs con ese ID'
      });
    }
    await PTLTiposLogs.update(data, {
      where: { codigoTipoLog }
    });
    const tipoLogActualizado = await PTLTiposLogs.findOne({ where: { codigoTipoLog } });
    return res.status(200).json({
      ok: true,
      tipoLog: tipoLogActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el tiposLogs'
    });
  }
};

const deleteTipoLog = async (req, res = response) => {
  try {
    const codigoTipoLog = req.params.id;
    const tipoLogDB = await PTLTiposLogs.findOne({
      where: { codigoTipoLog }
    });
    if (!tipoLogDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un tiposLogs con ese ID'
      });
    }
    tipoLogEliminado = await PTLTiposLogs.destroy({
      where: { codigoTipoLog }
    });
    return res.status(200).json({
      ok: true,
      tipoLog: tipoLogEliminado,
      msg: 'TipoLog eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el tiposLogs'
    });
  }
};

module.exports = {
  getTiposLogs,
  getTipoLogById,
  createTipoLog,
  updateTipoLog,
  deleteTipoLog,
};
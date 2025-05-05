/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLLogsTransaccionesAP = require('../models/log-transaccion')(sequelize);

// Obtener todos los roles
const getLogsTransacciones = async (req, res) => {
  try {
    const logs = await PTLLogsTransaccionesAP.findAll();
    return res.status(201).json({
      ok: true,
      logs: logs,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener UsuariosRoles' });
  }
};

const getLogTransaccionById = async (req, res) => {
  try {
    const { logId } = req.body;
    const log = await PTLLogsTransaccionesAP.findById(logId);
    if (!log) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un log por el id",
      });
    }
    return res.status(201).json({
      ok: true,
      log: log,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el log' });
  }
};

// Crear un nuevo rol
const createLogTransaccion = async (req, res = response) => {
  try {
    const log = req.body;
    const nuevo = await PTLLogsTransaccionesAP.create(log);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el log' });
  }
};

module.exports = {
  getLogsTransacciones,
  getLogTransaccionById,
  createLogTransaccion,
};
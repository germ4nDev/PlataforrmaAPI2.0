/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLLogActividadesAP = require('../models/log-actividad')(sequelize);

// Obtener todos los roles
const geLogsActividades = async (req, res) => {
  try {
    const logs = await PTLLogActividadesAP.findAll();
    return res.status(201).json({
      ok: true,
      logs: logs,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener UsuariosRoles' });
  }
};

const geLogActividadById = async (req, res) => {
  try {
    const { logId } = req.body;
    const log = await PTLLogActividadesAP.findById(logId);
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
const createLogActividad = async (req, res = response) => {
  try {
    const log = req.body;
    const nuevo = await PTLLogActividadesAP.create(log);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el log' });
  }
};

module.exports = {
  geLogsActividades,
  geLogActividadById,
  createLogActividad,
};

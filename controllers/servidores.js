/*
    Author: John Castañeda
    Actualizado: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLServidor = require('../models/servidor')(sequelize);
const { io } = require('../index');

const getServidores = async (req, res) => {
  try {
    const servidores = await PTLServidor.findAll();
    return res.status(201).json({
      ok: true,
      servidores: servidores,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener servidores' });
  }
};

const getServidorById = async (req, res) => {
  try {
    const codigoServidor = req.params.id;
    const servidor = await PTLServidor.findOne({
      where: {
        codigoServidor: codigoServidor,
      },
    });
    if (!servidor) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un servidor por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      servidor: servidor,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener servidor" });
  }
};

const createServidor = async (req, res = response) => {
  const { ...newRegistro } = req.body;
  try {
    const servidorDB = await PTLServidor.create(newRegistro);
    io.emit('servidores-actualizados', {
      action: 'create',
      msg: `Servidor creado: ${servidorDB.nombreServidor}`
    });
    return res.status(201).json({
      ok: true,
      servidor: servidorDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear el servidor'
    });
  }
};

const updateServidor = async (req, res = response) => {
  const { codigoServidor, ...data } = req.body;
  try {
    const servidorDB = await PTLServidor.findOne({
      where: { codigoServidor }
    });
    if (!servidorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un servidor con ese ID'
      });
    }
    await PTLServidor.update(data, {
      where: { codigoServidor }
    });
    const servidorActualizado = await PTLServidor.findOne({ where: { codigoServidor } });
    io.emit('servidores-actualizados', {
      action: 'update',
      msg: `Servidor actualizado: ${servidorActualizado.nombreServidor}`
    });
    return res.status(200).json({
      ok: true,
      servidor: servidorActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el servidor'
    });
  }
};

const deleteServidor = async (req, res = response) => {
  try {
    const codigoServidor = req.params.id;
    const servidorDB = await PTLServidor.findOne({
      where: { codigoServidor }
    });
    if (!servidorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un servidor con ese ID'
      });
    }
    servidorEliminado = await PTLServidor.destroy({
      where: { codigoServidor }
    });
    io.emit('servidores-actualizados', {
      action: 'delete',
      msg: `Servidor eliminado: ${servidorDB.nombreServidor}`
    });
    return res.status(200).json({
      ok: true,
      usuario: servidorEliminado,
      msg: 'servidor eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el servidor'
    });
  }
};

module.exports = {
  getServidores,
  getServidorById,
  createServidor,
  updateServidor,
  deleteServidor,
};
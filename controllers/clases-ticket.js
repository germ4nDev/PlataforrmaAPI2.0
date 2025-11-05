/*
    Author: German Valencia
    Actualización: John Castañeda
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLClasesTicket = require('../models/clase-ticket')(sequelize);

// Obtener todos los roles
const getClasesTicket = async (req, res) => {
  try {
    const clasesTicket = await PTLClasesTicket.findAll();
    return res.status(201).json({
      ok: true,
      clasesTicket: clasesTicket,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la ClasesTicket' });
  }
};

const getClaseTicketById = async (req, res) => {
  try {
    const codigoClase = req.params.id;
    const claseTicket = await PTLClasesTicket.findOne({
      where: {
        codigoClase: codigoClase,
      },
    });
    if (!claseTicket) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una claseTicket por ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      claseTicket: claseTicket,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la claseTicket" });
  }
};

// Crear un nuevo rol
const createClaseTicket = async (req, res = response) => {
  try {
    const { ...nuevaClaseTicket } = req.body;
    const claseTicketDB = await PTLClasesTicket.create(nuevaClaseTicket);
    return res.status(201).json({
      ok: true,
      claseTicket: claseTicketDB
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al crear la claseTicket'
    });
  }
};

// Actualizar un nuevo rol
const updateClaseTicket = async (req, res = response) => {
  try {
    const { codigoClase, ...data } = req.body;
    const claseTicketDB = await PTLClasesTicket.findOne({
      where: { codigoClase }
    });
    if (!claseTicketDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una claseTicket con ese ID'
      });
    }
    await PTLClasesTicket.update(data, {
      where: { codigoClase }
    });
    const claseTicketActualizado = await PTLClasesTicket.findOne({ where: { codigoClase } });
    return res.status(200).json({
      ok: true,
      claseTicket: claseTicketActualizado
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar la claseTicket'
    });
  }
};

// Borrar un nuevo rol
const deleteClaseTicket = async (req, res = response) => {
  try {
    const codigoClase = req.params.id;
    const claseTicketDB = await PTLClasesTicket.findOne({
      where: { codigoClase }
    });
    if (!claseTicketDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un claseTicket con ese ID'
      });
    }
    claseTicketEliminado = await PTLClasesTicket.destroy({
      where: { codigoClase }
    });

    return res.status(200).json({
      ok: true,
      claseTicket: claseTicketEliminado,
      msg: 'la claseTicket se elimino correctamente'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar la claseTicket'
    });
  }
};

module.exports = {
  getClasesTicket,
  getClaseTicketById,
  createClaseTicket,
  updateClaseTicket,
  deleteClaseTicket,
};
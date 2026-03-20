/*
    Author: German Valencia
*/
const express = require('express');
const sequelize = require('../database/connection');
const PTLModulosPaquete = require('../models/modulo-paquete')(sequelize);
const { io } = require('../index');

const getModulosPaquete = async (req, res) => {
  try {
    const modulosPaquete = await PTLModulosPaquete.findAll();
    return res.status(201).json({
      ok: true,
      modulosPaquete: modulosPaquete,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ModulosPaquete, ' + err });
  }
};

const getModulosPaqueteById = async (req, res) => {
  try {
    const codigoModulo = req.params.id;
    const modulosPaquete = await PTLModulosPaquete.findOne({
      where: { codigoModulo },
    });
    if (!modulosPaquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un modulosPaquete con ese id",
      });
    }
    return res.status(201).json({
      ok: true,
      modulosPaquete: modulosPaquete,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el paquete' });
  }
};

const getModulosPaqueteByCode = async (req, res) => {
  try {
    const codego = req.params.code;
    const modulosPaquete = await PTLModulosPaquete.findAll({
      where: {
        codigoPaquete: codego,
      },
    });
    if (!modulosPaquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un modulosPaquete por el codigo",
      });
    }
    return res.status(201).json({
      ok: true,
      modulosPaquete: modulosPaquete,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener modulosPaquete" });
  }
};

const createModulosPaquete = async (req, res = response) => {
  const { ...newRegistro } = req.body;
  console.log('crear registro', newRegistro);
    try {
      const existente = await PTLModulosPaquete.findOne({
        where: { codigoModulo: newRegistro.codigoModulo }
      });
      
      if (existente) {
        return res.status(400).json({
          ok: false,
          msg: `El código ${newRegistro.codigoModulo} ya está registrado`
        });
      }
  
      const nuevo = await PTLModulosPaquete.create(newRegistro);
  
      if (typeof io !== 'undefined') {
        io.emit('paquetes-modulos-actualizados', {
          action: 'create',
          msg: `Paquete Modulo creado: ${nuevo.codigoModulo}`
        });
      } else {
        console.warn('Advertencia: Socket.io (io) no está definido, no se emitió el evento.');
      }
  
      return res.status(201).json({
        ok: true,
        paquete: nuevo,
      });
  
    } catch (err) {
      console.error('--- ERROR EN CREATE PAQUETE ---');
      console.error(err); 
      
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
          ok: false,
          error: "Faltan campos obligatorios",
          detalles: err.errors.map(e => e.message)
        });
      }
  
      res.status(500).json({ 
        ok: false,
        error: "Error interno en el servidor",
        msg: err.message 
      });
    }
};

const updateModulosPaquete = async (req, res = response) => {
  const { codigoModulo, ...data } = req.body;
  try {
    const modulosPaqueteOg = await PTLModulosPaquete.findOne({
      where: { codigoModulo },
    });
    if (!modulosPaqueteOg) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    await PTLModulosPaquete.update(data, {
      where: { codigoModulo },
    });
    const modulosPaqueteActualizado = await PTLModulosPaquete.findOne({
      where: { codigoModulo },
    });
    io.emit('modulos-paquete-actualizados', {
      action: 'update',
      msg: `Modulo actualizado: ${modulosPaqueteActualizado.nombreModulo}`
    });
    return res.status(201).json({
      ok: true,
      modulosPaquete: modulosPaqueteActualizado,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el paquete' });
  }
};

const deleteModulosPaquete = async (req, res = response) => {
  try {
    const codigoModulo = req.params.id;
    const modulosPaquete = await PTLModulosPaquete.findOne({
      where: { codigoModulo },
    });
    if (!modulosPaquete) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un paquete con ese id",
      });
    }
    const modulosPaqueteEliminado = await PTLModulosPaquete.destroy({
      where: { codigoModulo },
    });
    io.emit('modulos-paquete-actualizados', {
      action: 'delete',
      msg: `Modulo eliminado: ${modulosPaquete.nombreModulo}`
    });
    return res.status(201).json({
      ok: true,
      modulosPaquete: modulosPaqueteEliminado
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar modulosPaquete' });
  }
};

module.exports = {
  getModulosPaquete,
  getModulosPaqueteById,
  getModulosPaqueteByCode,
  createModulosPaquete,
  updateModulosPaquete,
  deleteModulosPaquete,
};
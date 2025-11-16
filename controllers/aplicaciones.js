/*
    Author: German Valencia
    Actualizado: German Valencia 20251026
*/
const express = require("express");
const sequelize = require("../database/connection");
// const { createLogActividad } = require("./logs-actividades");
const PTLAplicaciones = require("../models/aplicacion")(sequelize);
const { io } = require('../index');
// const PTLLogActividad = require("../models/log-actividad")(sequelize);

const getAplicaciones = async (req, res) => {
  try {
    const aplicaciones = await PTLAplicaciones.findAll();
    return res.status(201).json({
      ok: true,
      aplicaciones: aplicaciones,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Aplicaciones" });
  }
};

const getAplicacionById = async (req, res) => {
  try {
    const codigoAplicacion = req.params.id;
    const aplicacion = await PTLAplicaciones.findOne({
      where: {
        codigoAplicacion: codigoAplicacion,
      },
    });
    if (!aplicacion) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un aplicacion por el id",
      });
    }
    return res.status(201).json({
      ok: true,
      aplicacion: aplicacion,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener aplicacion" });
  }
};

const getAplicacionByCode = async (req, res) => {
  try {
    const codego = req.params.code;
    const aplicacion = await PTLAplicaciones.findOne({
      where: {
        codigoAplicacion: codego,
      },
    });
    if (!aplicacion) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un aplicacion por el codigo",
      });
    }
    return res.status(201).json({
      ok: true,
      aplicacion: aplicacion,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener aplicacion" });
  }
};

const createAplicacion = async (req, res = response) => {
    const { ...data } = req.body;
    console.log('crear aplicacion', data);
    try {
        const existente = await PTLAplicaciones.findOne({
            where: { codigoAplicacion: data.codigoAplicacion }
        });
        const existeNombre = await PTLAplicaciones.findOne({
            where: { nombreAplicacion: data.nombreAplicacion }
        });
        if (existente) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una aplicación con ese código'
            });
        }
        if (existeNombre) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una aplicación con ese nombre'
            });
        }
        console.log('nueva aplicacon', data);
        const aplicacionDB = await PTLAplicaciones.create(data);
        io.emit('aplicaciones-actualizadas', {
            action: 'create',
            msg: `Aplicación creada: ${aplicacionDB.nombreAplicacion}`
        });
        return res.status(201).json({
            ok: true,
            aplicacion: aplicacionDB
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: 'Error al crear la aplicación'
        });
    }
};

const updateAplicacion = async (req, res = response) => {
    try {
        const { codigoAplicacion, ...data } = req.body;
        console.log('body', req.body);
        const aplicacionDB = await PTLAplicaciones.findOne({
            where: { codigoAplicacion }
        });
        
        if (!aplicacionDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una aplicación con ese ID'
            });
        }
        data.codigoUsuarioModificacion = req.usuario?.id || 0;
        data.fechaModificacion = new Date().toISOString();
        await PTLAplicaciones.update(data, {
            where: { codigoAplicacion }
        });
        const aplicacionActualizada = await PTLAplicaciones.findOne({ where: { codigoAplicacion } });
        
        io.emit('aplicaciones-actualizadas', {
            action: 'update',
            msg: `Aplicación actualizada: ${aplicacionActualizada.nombreAplicacion}`
        });

        return res.status(200).json({
            ok: true,
            aplicacion: aplicacionActualizada
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: 'Error al actualizar la aplicación'
        });
    }
};

const deleteAplicacion = async (req, res = response) => {
    try {
        const codigoAplicacion = req.params.id;
        const aplicacionDB = await PTLAplicaciones.findOne({
            where: { codigoAplicacion }
        });
        if (!aplicacionDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una aplicación con ese ID'
            });
        }
        const nombreAplicacion = aplicacionDB.nombreAplicacion;
        const aplicacionEliminada = await PTLAplicaciones.destroy({
            where: { codigoAplicacion }
        });
        io.emit('aplicaciones-actualizadas', {
            action: 'delete',
            msg: `Aplicación eliminada: ${nombreAplicacion}`
        });
        return res.status(200).json({
            ok: true,
            aplicacion: aplicacionEliminada,
            msg: 'Aplicación eliminada correctamente'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            error: 'Error al eliminar la aplicación'
        });
    }
};

module.exports = {
  getAplicaciones,
  getAplicacionById,
  createAplicacion,
  updateAplicacion,
  deleteAplicacion,
  getAplicacionByCode,
};

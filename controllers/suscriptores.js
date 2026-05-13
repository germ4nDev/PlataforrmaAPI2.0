// /*
//     Author: German Valencia
//     Actualización: John Castañeda
//     Actualizado: German Valencia
// */
// const express = require('express');
// const sequelize = require('../database/connection');
// const bcrypt = require("bcryptjs");
// const PTLSuscriptores = require('../models/suscriptor')(sequelize);
// const PTLUsuarios = require('../models/usuario')(sequelize);
// const PTLUsuariosSC = require('../models/usuario-sc')(sequelize);
// // import { v4 as uuidv4 } from "uuid";
// const { io } = require("../index");

// const getSuscriptores = async (req, res) => {
//   try {
//     console.log("aca");
//     const suscriptores = await PTLSuscriptores.findAll();
//     // console.log('todos los suscriptores', suscriptores);
//     return res.status(201).json({
//       ok: true,
//       suscriptores: suscriptores,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener suscriptores", err });
//   }
// };

// const getSuscriptoresById = async (req, res) => {
//   try {
//     const codigoSuscriptor = req.params.id;
//     const suscriptor = await PTLSuscriptores.findOne({
//       where: {
//         codigoSuscriptor: codigoSuscriptor,
//       },
//     });
//     if (!suscriptor) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un suscriptor por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       suscriptor: suscriptor,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener el suscriptor" });
//   }
// };

// const createSuscriptor = async (req, res = response) => {
//   const { ...newRegistro } = req.body;
//   console.log("newRegistro", newRegistro);
//   try {
//     const existeNombre = await PTLSuscriptores.findOne({
//       where: { nombreSuscriptor: newRegistro.nombreSuscriptor },
//     });
//     if (existeNombre) {
//       return res.status(400).json({
//         ok: false,
//         msg: "Ya existe un suscriptor con ese nombre",
//       });
//     }
//     const fechaActual = new Date();
//     // const administrador = {
//     //   codigoUsuario: "",
//     //   identificacionUsuario: newRegistro.identificacionSuscriptor,
//     //   nombreUsuario: newRegistro.nombreSuscriptor,
//     //   correoUsuario: newRegistro.correoSuscriptor,
//     //   userNameUsuario: newRegistro.usuarioAdministrador,
//     //   claveUsuario: newRegistro.usuarioAdministrador,
//     //   descripcionUsuario: newRegistro.descripcionSuscriptor,
//     //   fotoUsuario: "no-imagen.png",
//     //   usuarioAdministrador: true,
//     //   estadoUsuario: true,
//     //   codigoUsuarioCreacion: newRegistro.codigoSusucriptor,
//     //   fechaCreacion: fechaActual.toISOString(),
//     // };
//     // const usuarioDB = await PTLUsuarios.create(administrador);
//     // newRegistro.codigoAdministrador = administrador.codigoUsuario;
//     const suscriptorDB = await PTLSuscriptores.create(newRegistro);
//     // const usuarioSuscriptor = {
//     //   codigoUsuarioSC: uuidv4(),
//     //   codigoUsuario: usuarioDB.codigoUsuario,
//     codigoSuscriptor: (suscriptorDB.codigoSusucriptor,
//       //   estadoUsuarioSC: true,
//       //   codigoUsuarioCreacion: suscriptorDB.codigoSusucriptor,
//       //   fechaCreacion: fechaActual.toISOString()
//       // }
//       // const usuarioSCDB = await PTLUsuariosSC.create(usuarioSuscriptor);
//       io.emit("suscriptores-actualizados", {
//         action: "create",
//         msg: `Suscriptor creada: ${suscriptorDB.nombreSuscriptor}`,
//       }));
//     return res.status(201).json({
//       ok: true,
//       suscriptor: suscriptorDB,
//       // usuario: usuarioDB,
//       // usuarioSC: usuarioSCDB,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: "Error al crear el suscriptor",
//     });
//   }
// };


// const updateSuscriptor = async (req, res = response) => {
//   const { codigoSuscriptor, ...data } = req.body;
//   try {
//     const suscriptorDB = await PTLSuscriptores.findOne({
//       where: { codigoSuscriptor }
//     });
//     if (!suscriptorDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un suscriptor con ese ID'
//       });
//     }
//     await PTLSuscriptores.update(data, {
//       where: { codigoSuscriptor }
//     });
//     const suscriptorActualizado = await PTLSuscriptores.findOne({ where: { codigoSuscriptor } });
//     io.emit('suscriptores-actualizados', {
//       action: 'update',
//       msg: `Suscriptor actualizado: ${suscriptorActualizado.nombreSuscriptor}`
//     });
//     return res.status(200).json({
//       ok: true,
//       suscriptor: suscriptorActualizado
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al actualizar el suscriptor'
//     });
//   }
// };

// const deleteSuscriptor = async (req, res = response) => {
//   try {
//     const codigoSuscriptor = req.params.id;
//     const suscriptorDB = await PTLSuscriptores.findOne({
//       where: { codigoSuscriptor }
//     });
//     if (!suscriptorDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: 'No existe un suscriptor con ese ID'
//       });
//     }
//     suscriptorEliminado = await PTLSuscriptores.destroy({
//       where: { codigoSuscriptor }
//     });
//     io.emit('suscriptores-actualizados', {
//       action: 'delete',
//       msg: `Suscriptor eliminado correctamente`
//     });
//     return res.status(200).json({
//       ok: true,
//       suscriptor: suscriptorEliminado,
//       msg: 'Suscriptor eliminado correctamente'
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: 'Error al eliminar el suscriptor'
//     });
//   }
// };

// module.exports = {
//   getSuscriptores,
//   getSuscriptoresById,
//   createSuscriptor,
//   updateSuscriptor,
//   deleteSuscriptor
// };

/*
    Author: German Valencia
    Actualización: John Castañeda
    Actualizado: German Valencia
*/
const { response } = require('express');
const suscriptoresService = require('../services/suscriptores.service'); // Ajusta la ruta a tu proyecto

const getSuscriptores = async (req, res = response) => {
  try {
    const suscriptores = await suscriptoresService.obtenerSuscriptores();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      suscriptores: suscriptores,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener suscriptores", err });
  }
};

const getSuscriptoresById = async (req, res = response) => {
  try {
    const suscriptor = await suscriptoresService.obtenerSuscriptorPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      suscriptor: suscriptor,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener el suscriptor" });
  }
};

const createSuscriptor = async (req, res = response) => {
  try {
    console.log("Datos recibidos:", req.body);
    const suscriptorDB = await suscriptoresService.crearSuscriptor(req.body);

    return res.status(201).json({
      ok: true,
      suscriptor: suscriptorDB,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: "Error al crear el suscriptor",
    });
  }
};

const updateSuscriptor = async (req, res = response) => {
  try {
    const { codigoSuscriptor, ...data } = req.body;

    const suscriptorActualizado = await suscriptoresService.actualizarSuscriptor(codigoSuscriptor, data);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      suscriptor: suscriptorActualizado
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al actualizar el suscriptor'
    });
  }
};

const deleteSuscriptor = async (req, res = response) => {
  try {
    const suscriptorEliminado = await suscriptoresService.eliminarSuscriptor(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      suscriptor: suscriptorEliminado,
      msg: 'Suscriptor eliminado correctamente'
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: 'Error al eliminar el suscriptor'
    });
  }
};

module.exports = {
  getSuscriptores,
  getSuscriptoresById,
  createSuscriptor,
  updateSuscriptor,
  deleteSuscriptor
};
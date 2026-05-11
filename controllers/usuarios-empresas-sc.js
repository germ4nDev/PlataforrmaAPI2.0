// /*
//     Author: German Valencia
// */
// const express = require("express");
// const sequelize = require("../database/connection");
// const PTLUsuariosEmpresasSC = require("../models/usuario-empresa-sc")(
//   sequelize
// );
// const { io } = require("../index");

// const getUsuariosEmpresas = async (req, res) => {
//   try {
//     const usuariosEmpresas = await PTLUsuariosEmpresasSC.findAll();
//     return res.status(201).json({
//       ok: true,
//       usuariosEmpresas: usuariosEmpresas,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener usuariosEmpresas" });
//   }
// };

// const getUsuariosEmpresasById = async (req, res) => {
//   try {
//     const codigoUsuarioEmpresaSC = req.params.id;
//     const usuarioEmpresa = await PTLUsuariosEmpresasSC.findOne({
//       where: {
//         codigoUsuarioEmpresaSC: codigoUsuarioEmpresaSC,
//       },
//     });
//     if (!usuarioEmpresa) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un usuarioEmpresa por ese id",
//       });
//     }
//     return res.status(201).json({
//       ok: true,
//       usuarioEmpresa: usuarioEmpresa,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener usuarioEmpresa" });
//   }
// };

// const createUsuarioEmpresa = async (req, res = response) => {
//   const { ...data } = req.body;
//   try {
//     const nuevo = await PTLUsuariosEmpresasSC.create(data);
//     io.emit('usuarios-empresas-actualizados', {
//       action: 'create',
//       msg: `Usuario Empresa creado`
//     });
//     return res.status(201).json({
//       ok: true,
//       usuarioEmpresa: nuevo,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Error al crear el usuarioEmpresa" });
//   }
// };

// const updateUsuarioEmpresa = async (req, res = response) => {
//   const { codigoUsuarioEmpresaSC, ...data } = req.body;
//   try {
//     const usuarioEmpresaDB = await PTLUsuariosEmpresasSC.findOne({
//       where: { codigoUsuarioEmpresaSC },
//     });
//     if (!usuarioEmpresaDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un usuarioEmpresa con ese ID",
//       });
//     }
//     await PTLUsuariosEmpresasSC.update(data, {
//       where: { codigoUsuarioEmpresaSC },
//     });
//     const usuarioEmpresaActualizado = await PTLUsuariosEmpresasSC.findOne({
//       where: { codigoUsuarioEmpresaSC },
//     });
//     io.emit('usuarios-empresas-actualizados', {
//       action: 'update',
//       msg: `Usuario Empresa actualizado`
//     });
//     return res.status(201).json({
//       ok: true,
//       usuarioEmpresa: usuarioEmpresaActualizado,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: "Error al actualizar el usuarioEmpresa",
//     });
//   }
// };

// const deleteUsuarioEmpresa = async (req, res = response) => {
//   try {
//     const codigoUsuarioEmpresaSC = req.params.id;
//     const usuarioEmpresaDB = await PTLUsuariosEmpresasSC.findOne({
//       where: { codigoUsuarioEmpresaSC },
//     });
//     if (!usuarioEmpresaDB) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe un usuarioEmpresa con ese ID",
//       });
//     }
//     const usuarioEmpresaEliminado = await PTLUsuariosEmpresasSC.destroy({
//       where: { codigoUsuarioEmpresaSC },
//     });
//     io.emit('usuarios-empresas-actualizados', {
//       action: 'delete',
//       msg: `Usuario Empresa eliminado`
//     });
//     return res.status(200).json({
//       ok: true,
//       usuarioEmpresa: usuarioEmpresaEliminado,
//       msg: "usuarioEmpresa eliminado correctamente",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       ok: false,
//       error: "Error al eliminar el usuarioEmpresa",
//     });
//   }
// };

// module.exports = {
//   getUsuariosEmpresas,
//   getUsuariosEmpresasById,
//   createUsuarioEmpresa,
//   updateUsuarioEmpresa,
//   deleteUsuarioEmpresa,
// };

/*
    Author: German Valencia
*/
const { response } = require("express"); // Importación agregada para tipado correcto
const usuariosEmpresasService = require("../services/usuarios-empresas-sc.service"); // Ajusta la ruta a tu proyecto

const getUsuariosEmpresas = async (req, res = response) => {
  try {
    const usuariosEmpresas = await usuariosEmpresasService.obtenerUsuariosEmpresas();

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      usuariosEmpresas: usuariosEmpresas,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuariosEmpresas" });
  }
};

const getUsuariosEmpresasById = async (req, res = response) => {
  try {
    const usuarioEmpresa = await usuariosEmpresasService.obtenerUsuarioEmpresaPorId(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      usuarioEmpresa: usuarioEmpresa,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    res.status(500).json({ error: "Error al obtener usuarioEmpresa" });
  }
};

const createUsuarioEmpresa = async (req, res = response) => {
  try {
    const nuevoUsuarioEmpresa = await usuariosEmpresasService.crearUsuarioEmpresa(req.body);

    return res.status(201).json({
      ok: true,
      usuarioEmpresa: nuevoUsuarioEmpresa,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear el usuarioEmpresa" });
  }
};

const updateUsuarioEmpresa = async (req, res = response) => {
  try {
    const { codigoUsuarioEmpresaSC, ...data } = req.body;

    const usuarioEmpresaActualizado = await usuariosEmpresasService.actualizarUsuarioEmpresa(codigoUsuarioEmpresaSC, data);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      usuarioEmpresa: usuarioEmpresaActualizado,
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: "Error al actualizar el usuarioEmpresa",
    });
  }
};

const deleteUsuarioEmpresa = async (req, res = response) => {
  try {
    const usuarioEmpresaEliminado = await usuariosEmpresasService.eliminarUsuarioEmpresa(req.params.id);

    return res.status(200).json({ // Cambiado de 201 a 200
      ok: true,
      usuarioEmpresa: usuarioEmpresaEliminado,
      msg: "UsuarioEmpresa eliminado correctamente",
    });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).json({ ok: false, msg: err.msg });
    }
    return res.status(500).json({
      ok: false,
      error: "Error al eliminar el usuarioEmpresa",
    });
  }
};

module.exports = {
  getUsuariosEmpresas,
  getUsuariosEmpresasById,
  createUsuarioEmpresa,
  updateUsuarioEmpresa,
  deleteUsuarioEmpresa,
};
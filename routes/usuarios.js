/*
    Author: German Valencia
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const sequelize = require('../database/connection');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getUsuarios,
  getUsuariosById,
  createUsuario,
  updateUsuario,
  updateUsuarioClave,
  deleteUsuario,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", validarJWT, validarJWT, getUsuarios);

router.post( "/", validarJWT, validarJWT, createUsuario);

router.put("/:id", validarJWT, validarJWT, updateUsuario);

router.put("/datos/:id", validarJWT, validarJWT, updateUsuario);

router.put("/clave/:id", validarJWT, validarJWT, updateUsuarioClave);

router.delete("/:id", validarJWT, validarJWT, deleteUsuario);

router.get("/:id", validarJWT, validarJWT, getUsuariosById);

module.exports = router;

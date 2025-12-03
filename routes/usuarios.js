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
  validarPasswordUsuario,
  deleteUsuario,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.post( "/", validarJWT, createUsuario);

router.post( "/validar", validarJWT, validarPasswordUsuario);

router.put("/:id", validarJWT, updateUsuario);

router.put("/datos/:id", validarJWT, updateUsuario);

router.put("/clave/:id", validarJWT, updateUsuarioClave);

router.delete("/:id", validarJWT, deleteUsuario);

router.get("/:id", validarJWT, getUsuariosById);

module.exports = router;

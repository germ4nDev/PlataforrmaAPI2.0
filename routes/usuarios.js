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

router.get("/", getUsuarios);

router.post( "/", createUsuario);

router.put("/:id", updateUsuario);

router.put("/datos/:id", updateUsuario);

router.put("/clave/:id", updateUsuarioClave);

router.delete("/:id", deleteUsuario);

router.get("/:id", getUsuariosById);

module.exports = router;

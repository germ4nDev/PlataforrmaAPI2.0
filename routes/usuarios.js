/*
    Author: German Valencia
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getUsuarios,
  getUsuariosById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", getUsuarios);

router.post( "/",  validarJWT, createUsuario);

router.put("/:id",validarJWT, updateUsuario);

router.delete("/:id", [validarJWT], deleteUsuario);

router.get("/:id", validarJWT, getUsuariosById);

module.exports = router;

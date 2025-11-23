/*
    Author: German Valencia
    Ruta: /api/usuarios-empresas
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getUsuariosSC,
  getUsuariosSCById,
  getUsuariosSCByCodigos,
  createUsuarioSC,
  updateUsuarioSC,
  deleteUsuarioSC,
} = require("../controllers/usuarios-sc");

const router = Router();

router.get("/", validarJWT, getUsuariosSC);

router.post( "/", validarJWT, createUsuarioSC);

router.put("/:id", validarJWT, updateUsuarioSC);

router.delete("/:id", validarJWT, deleteUsuarioSC);

router.get("/:id", validarJWT, getUsuariosSCById);

router.get("/codigos/:id", validarJWT, getUsuariosSCByCodigos);

module.exports = router;
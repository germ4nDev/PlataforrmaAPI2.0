/*
    Author: German Valencia
    Ruta: /api/usuarios-roles
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getUsuariosRoles,
  getUsuariosRolesById,
  createUsuarioRole,
  updateUsuarioRole,
  deleteUsuarioRole,
} = require("../controllers/usuarios-roles");

const router = Router();

router.get("/", getUsuariosRoles);

router.post( "/",  validarJWT, createUsuarioRole);

router.put("/:id",validarJWT, updateUsuarioRole);

router.delete("/:id", [validarJWT], deleteUsuarioRole);

router.get("/:id", validarJWT, getUsuariosRolesById);

module.exports = router;

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
  deleteTodosUsuarioRole,
} = require("../controllers/usuarios-roles");

const router = Router();

router.get("/", validarJWT, getUsuariosRoles);

router.get("/:id", validarJWT,  getUsuariosRolesById);

router.post( "/", validarJWT, createUsuarioRole);

router.put("/:id", validarJWT, updateUsuarioRole);

router.delete("/:id", validarJWT, deleteUsuarioRole);

router.delete("/clean/:usId/:apId/:suId", validarJWT, deleteTodosUsuarioRole);

module.exports = router;

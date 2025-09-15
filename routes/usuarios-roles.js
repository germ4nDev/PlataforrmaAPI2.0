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

router.get("/", getUsuariosRoles);

router.get("/:id",  getUsuariosRolesById);

router.post( "/", createUsuarioRole);

router.put("/:id", updateUsuarioRole);

router.delete("/:id", deleteUsuarioRole);

router.delete("/clean/:usId/:apId/:suId", deleteTodosUsuarioRole);

module.exports = router;

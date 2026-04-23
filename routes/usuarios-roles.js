/*
    Author: German Valencia
    Actualizado: John Castañeda
    Ruta: /api/usuarios-roles
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getUsuariosRoles,
  getUsuariosRolesById,
  getUsuariosPorCodigoRol,
  createUsuarioRole,
  updateUsuarioRole,
  updateUsuarioRoles,
  deleteUsuarioRole,
  deleteTodosUsuarioRole,
  getRolesPorCodigoUsuario,
  deleteRolesPorUsuario
} = require("../controllers/usuarios-roles");

const router = Router();

router.get("/", validarJWT, getUsuariosRoles);

router.get("/:id", validarJWT,  getUsuariosRolesById);

router.get("/role/:codigoRole", validarJWT, getUsuariosPorCodigoRol);

router.post( "/", validarJWT, createUsuarioRole);

router.put("/:id", validarJWT, updateUsuarioRole);

router.put("/:id", validarJWT, updateUsuarioRoles);

router.delete("/:id", validarJWT, deleteUsuarioRole);

router.delete("/clean/:id", validarJWT, deleteTodosUsuarioRole);

router.get("/usuario/:codigoUsuarioSC", validarJWT, getRolesPorCodigoUsuario);

router.delete("/clean-user/:id", validarJWT, deleteRolesPorUsuario);

module.exports = router;

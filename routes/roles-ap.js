/*
    Author: German Valencia
    Actualización: John Castañeda
    Ruta: /api/roles
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
} = require("../controllers/roles-ap");

const router = Router();

router.get("/", getRoles);

router.get("/:id", validarJWT, getRoleById);

router.post( "/",  validarJWT, createRole);

router.put("/:id", validarJWT, updateRole);

router.delete("/:id", validarJWT, deleteRole);

module.exports = router;
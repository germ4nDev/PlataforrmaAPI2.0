/*
    Author: German Valencia
    Ruta: /api/roles
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getRolesAP,
    getRoleAPById,
    createRoleAP,
    updateRoleAP,
    deleteRoleAP,
} = require("../controllers/roles");

const router = Router();

router.get("/", getRolesAP);

router.post( "/",  validarJWT, createRoleAP);

router.put("/:id", validarJWT, updateRoleAP);

router.delete("/:id", validarJWT, deleteRoleAP);

router.get("/:id", validarJWT, getRoleAPById);

module.exports = router;
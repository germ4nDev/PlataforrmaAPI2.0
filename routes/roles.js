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

router.post( "/",  createRoleAP);

router.put("/:id", updateRoleAP);

router.delete("/:id", deleteRoleAP);

router.get("/:id", getRoleAPById);

module.exports = router;
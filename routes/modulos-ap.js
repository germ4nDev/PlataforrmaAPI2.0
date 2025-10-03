/*
    Author: German Valencia
    Ruta: /api/usuarios-roles
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getModulos,
    getModuloById,
    createModulo,
    updateModulo,
    deleteModulo,
} = require("../controllers/modulos-ap");

const router = Router();

router.get("/", getModulos);

router.post( "/", createModulo);

router.put("/:id", updateModulo);

router.delete("/:id", deleteModulo);

router.get("/:id", getModuloById);

module.exports = router;
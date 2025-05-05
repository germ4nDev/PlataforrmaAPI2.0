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

router.post( "/",  validarJWT, createModulo);

router.put("/:id",validarJWT, updateModulo);

router.delete("/:id", [validarJWT], deleteModulo);

router.get("/:id", validarJWT, getModuloById);

module.exports = router;
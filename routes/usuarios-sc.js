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
    getUsuariosSCByCodigo,
    createUsuarioSC,
    updateUsuarioSC,
    deleteUsuarioSC,
} = require("../controllers/usuarios-sc");

const router = Router();

router.get("/", validarJWT, getUsuariosSC);

router.get("/code/:id", validarJWT, getUsuariosSCByCodigo);

router.post("/", validarJWT, createUsuarioSC);

router.put("/:id", validarJWT, updateUsuarioSC);

router.delete("/:id", validarJWT, deleteUsuarioSC);

router.get("/:id", validarJWT, getUsuariosSCById);

module.exports = router;
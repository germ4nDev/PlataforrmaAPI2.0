/*
    Author: German Valencia
    Ruta: /api/usuarios-empresas
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getUsuariosEmpresas,
    getUsuariosEmpresasById,
    createUsuarioEmpresa,
    updateUsuarioEmpresa,
    deleteUsuarioEmpresa,
} = require("../controllers/usuarios-empresas");

const router = Router();

router.get("/", getUsuariosEmpresas);

router.get("/:id", validarJWT, getUsuariosEmpresasById);

router.post( "/",  validarJWT, createUsuarioEmpresa);

router.put("/:id",validarJWT, updateUsuarioEmpresa);

router.delete("/:id", [validarJWT], deleteUsuarioEmpresa);

module.exports = router;
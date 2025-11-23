/*
    Author: John Castañeda
    Ruta: /api/seguimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getServidores,
    getServidorById,
    createServidor,
    updateServidor,
    deleteServidor,
} = require("../controllers/servidores");

const router = Router();

router.get("/", validarJWT, getServidores);

router.post( "/", validarJWT, createServidor);

router.put("/:id", validarJWT, updateServidor);

router.delete("/:id", validarJWT, deleteServidor);

router.get("/:id", validarJWT, getServidorById);

module.exports = router;
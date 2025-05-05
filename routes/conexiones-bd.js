/*
    Author: German Valencia
    Ruta: /api/conexiones-bd
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getConexionesBD,
    getConexionById,
    createConexion,
    updateConexion,
    deleteConexion,
} = require("../controllers/conexiones-bd");

const router = Router();

router.get("/", getConexionesBD);

router.post( "/",  validarJWT, createConexion);

router.put("/:id",validarJWT, updateConexion);

router.delete("/:id", [validarJWT], deleteConexion);

router.get("/:id", validarJWT, getConexionById);

module.exports = router;
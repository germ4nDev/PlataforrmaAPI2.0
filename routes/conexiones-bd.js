/*
    Author: German Valencia
    Actualización: John Castañeda

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

router.post( "/", createConexion);

router.put("/:id", updateConexion);

router.delete("/:id", deleteConexion);

router.get("/:id", getConexionById);

module.exports = router;
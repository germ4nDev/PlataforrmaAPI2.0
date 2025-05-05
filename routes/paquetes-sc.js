/*
    Author: German Valencia
    Ruta: /api/suscriptores
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getPaquetesSC,
    getPaquetesSCById,
    createPaqueteSC,
    updatePaqueteSC,
    deletePaqueteSC,
} = require("../controllers/paquetes-sc");

const router = Router();

router.get("/", getPaquetesSC);

router.post( "/",  validarJWT, createPaqueteSC);

router.put("/:id",validarJWT, updatePaqueteSC);

router.delete("/:id", [validarJWT], deletePaqueteSC);

router.get("/:id", validarJWT, getPaquetesSCById);

module.exports = router;
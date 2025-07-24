/*
    Author: German Valencia
    Actualización: John Castañeda
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

router.post( "/", createPaqueteSC);

router.put("/:id", updatePaqueteSC);

router.delete("/:id", deletePaqueteSC);

router.get("/:id", getPaquetesSCById);

module.exports = router;
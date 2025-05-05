/*
    Author: German Valencia
    Ruta: /api/suscriptores
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getPaquetesAplicaciones,
    getPaquetesAplicacionesById,
    createPaqueteAplicacion,
    updatePaqueteAplicacion,
    deletePaqueteAplicacion,
} = require("../controllers/paquetes-aplicaciones");

const router = Router();

router.get("/", getPaquetesAplicaciones);

router.post( "/",  validarJWT, createPaqueteAplicacion);

router.put("/:id",validarJWT, updatePaqueteAplicacion);

router.delete("/:id", [validarJWT], deletePaqueteAplicacion);

router.get("/:id", validarJWT, getPaquetesAplicacionesById);

module.exports = router;
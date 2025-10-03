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

router.post( "/", createPaqueteAplicacion);

router.put("/:id", updatePaqueteAplicacion);

router.delete("/:id", deletePaqueteAplicacion);

router.get("/:id", getPaquetesAplicacionesById);

module.exports = router;
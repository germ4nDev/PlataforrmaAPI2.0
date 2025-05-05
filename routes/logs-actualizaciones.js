/*
    Author: German Valencia
    Ruta: /api/logs-actualizaviones
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getLogsActualizaciones,
    getLogActualizacionById,
    createLogActualizacion,
} = require("../controllers/logs-actualizaciones");

const router = Router();

router.get("/", getLogsActualizaciones);

router.post( "/",  validarJWT, createLogActualizacion);

router.get("/:id", validarJWT, getLogActualizacionById);

module.exports = router;
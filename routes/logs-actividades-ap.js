/*
    Author: German Valencia
    Actualización: John Castañeda
    Ruta: /api/logs-actividades
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    geLogsActividades,
    geLogActividadById,
    createLogActividad,
} = require("../controllers/logs-actividades-ap");

const router = Router();

router.get("/", geLogsActividades);

router.post( "/",  validarJWT, createLogActividad);

router.get("/:id", validarJWT, geLogActividadById);

module.exports = router;
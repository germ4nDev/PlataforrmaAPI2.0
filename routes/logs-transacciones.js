/*
    Author: German Valencia
    Ruta: /api/logs-transacciones
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getLogsTransacciones,
    getLogTransaccionById,
    createLogTransaccion,
} = require("../controllers/logs-transacciones");

const router = Router();

router.get("/", validarJWT, getLogsTransacciones);

router.post( "/", validarJWT,  validarJWT, createLogTransaccion);

router.get("/:id", validarJWT, validarJWT, getLogTransaccionById);

module.exports = router;
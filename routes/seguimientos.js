/*
    Author: German Valencia
    Ruta: /api/seguimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getSeguimientosRQ,
    getSeguimientoRQById,
    createSeguimientoRQ,
    updateSeguimientoRQ,
    deleteSeguimientoRQ,
} = require("../controllers/seguimientos");

const router = Router();

router.get("/", getSeguimientosRQ);

router.post( "/",  validarJWT, createSeguimientoRQ);

router.put("/:id", validarJWT, updateSeguimientoRQ);

router.delete("/:id", validarJWT, deleteSeguimientoRQ);

router.get("/:id", validarJWT, getSeguimientoRQById);

module.exports = router;
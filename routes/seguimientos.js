/*
    Author: German Valencia
    Actualización: John Castañeda
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

router.post( "/", createSeguimientoRQ);

router.put("/:id", updateSeguimientoRQ);

router.delete("/:id", deleteSeguimientoRQ);

router.get("/:id", getSeguimientoRQById);

module.exports = router;
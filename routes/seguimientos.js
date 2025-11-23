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
    getSeguimientosTK,
    getSeguimientoTKById,
    getSeguimientoTKByTicket,
    createSeguimientoTK,
    updateSeguimientoTK,
    deleteSeguimientoTK,
} = require("../controllers/seguimientos");

const router = Router();

router.get("/", validarJWT, getSeguimientosTK);

router.post("/", validarJWT, createSeguimientoTK);

router.put("/:id", validarJWT, updateSeguimientoTK);

router.delete("/:id", validarJWT, deleteSeguimientoTK);

router.get("/:id", validarJWT, getSeguimientoTKById);

router.get("/ticket/:id", validarJWT, getSeguimientoTKByTicket);

module.exports = router;
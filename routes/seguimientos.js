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

router.get("/", getSeguimientosTK);

router.post("/", createSeguimientoTK);

router.put("/:id", updateSeguimientoTK);

router.delete("/:id", deleteSeguimientoTK);

router.get("/:id", getSeguimientoTKById);

router.get("/ticket/:id", getSeguimientoTKByTicket);

module.exports = router;
/*
    Author: German Valencia
    Actualización: John Castañeda
    Ruta: /api/requerimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getRequerimientosTK,
    getRequerimientoTKById,
    createRequerimientoTK,
    updateRequerimientoTK,
    deleteRequerimientoTK,
} = require("../controllers/requerimientos");

const router = Router();

router.get("/", getRequerimientosTK);

router.post("/", createRequerimientoTK);

router.put("/:id", updateRequerimientoTK);

router.delete("/:id", deleteRequerimientoTK);

router.get("/:id", getRequerimientoTKById);

module.exports = router;
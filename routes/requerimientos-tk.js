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
} = require("../controllers/requerimientos-tk");

const router = Router();

router.get("/", getRequerimientosTK);

router.post( "/",  validarJWT, createRequerimientoTK);

router.put("/:id", validarJWT, updateRequerimientoTK);

router.delete("/:id", validarJWT, deleteRequerimientoTK);

router.get("/:id", validarJWT, getRequerimientoTKById);

module.exports = router;
/*
    Author: German Valencia
    Ruta: /api/clasesTcket
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getGalerias,
    getGaleriaById,
    createGaleria,
    updateGaleria,
    deleteGaleria,
} = require("../controllers/galerias");

const router = Router();

router.get("/", validarJWT, getGalerias);

router.post("/", validarJWT, createGaleria);

router.put("/:id", validarJWT, updateGaleria);

router.delete("/:id", validarJWT, deleteGaleria);

router.get("/:id", validarJWT, getGaleriaById);

module.exports = router;
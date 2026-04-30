/*
    Author: German Valencia
    Ruta: /api/clasesTcket
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getFormatoGaleria,
    getFormatoGaleriaById,
    createFormatoGaleria,
    updateFormatoGaleria,
    deleteFormatoGaleria,
} = require("../controllers/formatos-galeria");

const router = Router();

router.get("/", validarJWT, getFormatoGaleria);

router.post("/", validarJWT, createFormatoGaleria);

router.put("/:id", validarJWT, updateFormatoGaleria);

router.delete("/:id", validarJWT, deleteFormatoGaleria);

router.get("/:id", validarJWT, getFormatoGaleriaById);

module.exports = router;
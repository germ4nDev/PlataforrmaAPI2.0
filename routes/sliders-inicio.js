/*
    Author: German Valencia

    Ruta: /api/slidersInicio
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getSlidersInicio,
    getSliderInicioById,
    createSliderInicio,
    updateSliderInicio,
    deleteSliderInicio,
} = require("../controllers/sliders-inicio");

const router = Router();

router.get("/", getSlidersInicio);

router.post("/", validarJWT, createSliderInicio);

router.put("/:id", validarJWT, updateSliderInicio);

router.delete("/:id", validarJWT, deleteSliderInicio);

router.get("/:id", validarJWT, getSliderInicioById);

module.exports = router;
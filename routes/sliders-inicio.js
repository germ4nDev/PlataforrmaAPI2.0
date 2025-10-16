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

router.post("/", createSliderInicio);

router.put("/:id", updateSliderInicio);

router.delete("/:id", deleteSliderInicio);

router.get("/:id", getSliderInicioById);

module.exports = router;
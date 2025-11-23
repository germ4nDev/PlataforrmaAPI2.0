/*
    Author: German Valencia

    Ruta: /api/coloresSettings
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getColoresSettings,
    getColorSettingById,
    createColorSetting,
    updateColorSetting,
    deleteColorSetting,
} = require("../controllers/colores-settings");

const router = Router();

router.get("/", validarJWT, getColoresSettings);

router.post("/", validarJWT, createColorSetting);

router.put("/:id", validarJWT, updateColorSetting);

router.delete("/:id", validarJWT, deleteColorSetting);

router.get("/:id", validarJWT, getColorSettingById);

module.exports = router;
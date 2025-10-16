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

router.get("/", getColoresSettings);

router.post("/", createColorSetting);

router.put("/:id", updateColorSetting);

router.delete("/:id", deleteColorSetting);

router.get("/:id", getColorSettingById);

module.exports = router;
/*
    Author: German Valencia
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getVersionesAP,
    getVersionesAPById,
    createVersionAP,
    updateVersionAP,
    deleteVersionAP,
} = require("../controllers/versiones-ap");

const router = Router();

router.get("/", getVersionesAP);

router.post( "/",  createVersionAP);

router.put("/:id", updateVersionAP);

router.delete("/:id", deleteVersionAP);

router.get("/:id", getVersionesAPById);

module.exports = router;
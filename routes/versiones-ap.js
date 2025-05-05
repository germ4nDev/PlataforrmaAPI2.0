/*
    Author: German Valencia
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getVersioesAP,
    getVersioesAPById,
    createVersionAP,
    updateVersionAP,
    deleteVersionAP,
} = require("../controllers/versiones-ap");

const router = Router();

router.get("/", getVersioesAP);

router.post( "/",  validarJWT, createVersionAP);

router.put("/:id",validarJWT, updateVersionAP);

router.delete("/:id", [validarJWT], deleteVersionAP);

router.get("/:id", validarJWT, getVersioesAPById);

module.exports = router;
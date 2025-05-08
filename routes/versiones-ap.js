/*
    Author: German Valencia
    Actualización: John Castañeda
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

router.get("/:id", validarJWT, getVersionesAPById);

router.post( "/",  validarJWT, createVersionAP);

router.put("/:id",validarJWT, updateVersionAP);

router.delete("/:id", [validarJWT], deleteVersionAP);


module.exports = router;
/*
    Author: German Valencia
    Ruta: /api/suscriptores
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getSuscriptores,
    getSuscriptoresById,
    createSuscriptor,
    updateSuscriptor,
    deleteSuscriptor,
} = require("../controllers/suscriptores");

const router = Router();

router.get("/", getSuscriptores);

router.post( "/",  validarJWT, createSuscriptor);

router.put("/:id",validarJWT, updateSuscriptor);

router.delete("/:id", [validarJWT], deleteSuscriptor);

router.get("/:id", validarJWT, getSuscriptoresById);

module.exports = router;
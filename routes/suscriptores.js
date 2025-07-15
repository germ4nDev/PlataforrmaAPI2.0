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

router.post( "/", createSuscriptor);

router.put("/:id", updateSuscriptor);

router.delete("/:id", deleteSuscriptor);

router.get("/:id", getSuscriptoresById);

module.exports = router;
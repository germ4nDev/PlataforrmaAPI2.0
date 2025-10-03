/*
    Author: German Valencia
    Ruta: /api/suscriptores-paquetes
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getSuscriptoresPaquetes,
    getSuscriptoresPaquetesById,
    createSuscriptorPaquete,
    updateSuscriptorPaquete,
    deleteSuscriptorPaquete,
} = require("../controllers/suscriptores-paquetes");

const router = Router();

router.get("/", getSuscriptoresPaquetes);

router.get("/:id", getSuscriptoresPaquetesById);

router.post( "/",  createSuscriptorPaquete);

router.put("/:id", updateSuscriptorPaquete);

router.delete("/:id",  deleteSuscriptorPaquete);

module.exports = router;
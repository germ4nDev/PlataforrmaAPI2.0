/*
    Author: John Castañeda
    Ruta: /api/sitio-ap
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
    getSitios,
    getSitioById,
    createSitio,
    updateSitio,
    deleteSitio,
} = require("../controllers/sitios-ap");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getSitios);

router.get("/:id", validarJWT, getSitioById);

router.post( "/",  validarJWT, createSitio);

router.put("/:id",validarJWT, updateSitio);

router.delete("/:id", [validarJWT], deleteSitio);


module.exports = router;
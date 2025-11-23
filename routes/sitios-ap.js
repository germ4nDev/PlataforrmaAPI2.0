/*
    Author: John Castañeda
    Ruta: /api/sitio-ap
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getSitios,
    getSitioById,
    createSitio,
    updateSitio,
    deleteSitio,
} = require("../controllers/sitios-ap");

const router = Router();

router.get("/", validarJWT, getSitios);

router.get("/:id", validarJWT, getSitioById);

router.post( "/", validarJWT,  createSitio);

router.put("/:id", validarJWT, updateSitio);

router.delete("/:id", validarJWT, deleteSitio);

module.exports = router;
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

const router = Router();

router.get("/", getSitios);

router.get("/:id", getSitioById);

router.post( "/",  createSitio);

router.put("/:id", updateSitio);

router.delete("/:id", deleteSitio);

module.exports = router;
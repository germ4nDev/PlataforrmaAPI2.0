/*
    Author: German Valencia
    Ruta: /api/idiomas
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getIdiomas,
    getIdiomaById,
    createIdioma,
    updateIdioma,
    deleteIdioma,
} = require("../controllers/idiomas");

const router = Router();

router.get("/", getIdiomas);

router.get("/:id", validarJWT, getIdiomaById);

router.post( "/",  validarJWT, createIdioma);

router.put("/:id",validarJWT, updateIdioma);

router.delete("/:id", [validarJWT], deleteIdioma);

module.exports = router;
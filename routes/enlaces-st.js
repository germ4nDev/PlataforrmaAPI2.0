/*
    Author: John Castañeda
    Ruta: /api/enlaces-st
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getEnlaces,
    getEnlaceById,
    createEnlace,
    updateEnlace,
    deleteEnlace,
} = require("../controllers/enlaces-st");

const router = Router();

router.get("/", validarJWT, getEnlaces);

router.get("/:id", validarJWT, getEnlaceById);

router.post( "/", validarJWT, createEnlace);

router.put("/:id", validarJWT,  updateEnlace);

router.delete("/:id", validarJWT, deleteEnlace);

module.exports = router;
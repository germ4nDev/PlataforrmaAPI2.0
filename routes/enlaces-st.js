/*
    Author: John Castañeda
    Ruta: /api/enlaces-st
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
    getEnlaces,
    getEnlaceById,
    createEnlace,
    updateEnlace,
    deleteEnlace,
} = require("../controllers/enlaces-st");

const router = Router();

router.get("/", getEnlaces);

router.get("/:id", getEnlaceById);

router.post( "/", createEnlace);

router.put("/:id",  updateEnlace);

router.delete("/:id", deleteEnlace);

module.exports = router;
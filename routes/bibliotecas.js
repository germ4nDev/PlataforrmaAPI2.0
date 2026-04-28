/*
    Author: German Valencia
    Ruta: /api/clasesTcket
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getBiblioteca,
    getBibliotecaById,
    createBiblioteca,
    updateBiblioteca,
    deleteBiblioteca,
} = require("../controllers/bibliotecas");

const router = Router();

router.get("/", validarJWT, getBiblioteca);

router.post("/", validarJWT, createBiblioteca);

router.put("/:id", validarJWT, updateBiblioteca);

router.delete("/:id", validarJWT, deleteBiblioteca);

router.get("/:id", validarJWT, getBibliotecaById);

module.exports = router;
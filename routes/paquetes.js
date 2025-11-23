/*
    Author: German Valencia
    Ruta: /api/suscriptores
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getPaquetes,
    getPaqueteById,
    createPaquete,
    updatePaquete,
    deletePaquete,
} = require("../controllers/paquetes");

const router = Router();

router.get("/", validarJWT, getPaquetes);

router.post("/", validarJWT, createPaquete);

router.put("/:id", validarJWT, updatePaquete);

router.delete("/:id", validarJWT, deletePaquete);

router.get("/:id", validarJWT, getPaqueteById);

module.exports = router;
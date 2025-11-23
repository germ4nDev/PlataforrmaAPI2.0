/*
    Author: German Valencia
    Ruta: /api/aplicaciones
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getAplicaciones,
    getAplicacionById,
    createAplicacion,
    updateAplicacion,
    deleteAplicacion,
    getAplicacionByCode,
} = require("../controllers/aplicaciones");

const router = Router();

router.get("/", validarJWT, getAplicaciones);

router.post("/", validarJWT, createAplicacion);

router.put("/:id", validarJWT, updateAplicacion);

router.delete("/:id", validarJWT, deleteAplicacion);

router.get("/:id", validarJWT, getAplicacionById);

router.get("/code/:code", validarJWT, getAplicacionByCode);

module.exports = router;
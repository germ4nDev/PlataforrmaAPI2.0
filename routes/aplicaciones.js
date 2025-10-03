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

router.get("/", getAplicaciones);

router.post( "/", createAplicacion);

router.put("/:id", updateAplicacion);

router.delete("/:id", deleteAplicacion);

router.get("/:id", getAplicacionById);

router.get("/code/:code", getAplicacionByCode);

module.exports = router;
/*
    Author: John Castañeda
    Ruta: /api/seguimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getEstados,
    getEstadosById,
    createEstado,
    updateEstado,
    deleteEstado,
} = require("../controllers/estados");

const router = Router();

router.get("/", getEstados);

router.post( "/", createEstado);

router.put("/:id", updateEstado);

router.delete("/:id", deleteEstado);

router.get("/:id", getEstadosById);

module.exports = router;
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

router.get("/", validarJWT, getEstados);

router.post( "/", validarJWT, createEstado);

router.put("/:id", validarJWT, updateEstado);

router.delete("/:id", validarJWT, deleteEstado);

router.get("/:id", validarJWT, getEstadosById);

module.exports = router;
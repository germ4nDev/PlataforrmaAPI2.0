/*
    Author: John Castañeda
    Ruta: /api/seguimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getTiposEstados,
    getTiposEstadosById,
    createTipoEstado,
    updateTipoEstado,
    deleteTipoEstado,
} = require("../controllers/tipos-estados");

const router = Router();

router.get("/", validarJWT, getTiposEstados);

router.post( "/", validarJWT, createTipoEstado);

router.put("/:id", validarJWT, updateTipoEstado);

router.delete("/:id", validarJWT, deleteTipoEstado);

router.get("/:id", validarJWT, getTiposEstadosById);

module.exports = router;
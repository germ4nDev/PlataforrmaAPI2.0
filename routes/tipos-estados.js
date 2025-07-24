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

router.get("/", getTiposEstados);

router.post( "/", createTipoEstado);

router.put("/:id", updateTipoEstado);

router.delete("/:id", deleteTipoEstado);

router.get("/:id", getTiposEstadosById);

module.exports = router;
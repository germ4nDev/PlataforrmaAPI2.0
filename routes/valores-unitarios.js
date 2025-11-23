/*
    Author: German Valencia
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getValoresUnitarios,
    getValoresUnitariosById,
    createValorUnitario,
    updateValorUnitario,
    deleteValorUnitario,
} = require("../controllers/valores-unitarios");

const router = Router();

router.get("/", validarJWT, getValoresUnitarios);

router.post("/", validarJWT, createValorUnitario);

router.put("/:id", validarJWT, updateValorUnitario);

router.delete("/:id", validarJWT, deleteValorUnitario);

router.get("/:id", validarJWT, getValoresUnitariosById);

module.exports = router;

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

router.get("/", getValoresUnitarios);

router.post("/", createValorUnitario);

router.put("/:id", updateValorUnitario);

router.delete("/:id", deleteValorUnitario);

router.get("/:id", getValoresUnitariosById);

module.exports = router;

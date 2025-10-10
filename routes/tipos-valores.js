/*
    Author: John Castañeda
    Ruta: /api/seguimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getTiposValores,
    getTiposValoresById,
    createTipoValor,
    updateTipoValor,
    deleteTipoValor,
} = require("../controllers/tipos-valores");

const router = Router();

router.get("/", getTiposValores);

router.post("/", createTipoValor);

router.put("/:id", updateTipoValor);

router.delete("/:id", deleteTipoValor);

router.get("/:id", getTiposValoresById);

module.exports = router;
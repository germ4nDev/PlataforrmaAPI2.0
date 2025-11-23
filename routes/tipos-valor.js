/*
    Author: German Valirncia
    Ruta: /api/seguimientos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getTiposValor,
  getTiposValorById,
  createTkipoValor,
  updateTkipoValor,
  deleteTkipoValor,
} = require("../controllers/tipos-valor");

const router = Router();

router.get("/", validarJWT, getTiposValor);

router.post( "/", validarJWT, createTkipoValor);

router.put("/:id", validarJWT, updateTkipoValor);

router.delete("/:id", validarJWT, deleteTkipoValor);

router.get("/:id", validarJWT, getTiposValorById);

module.exports = router;